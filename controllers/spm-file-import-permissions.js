const yup = require('yup');

const roleYupSchema = yup.object().shape({
  description: yup.string(),
  name: yup.string().required(),
  type: yup.string().required(),
  permissions: yup.object({
    application: yup.object({}),
    'content-manager': yup.object({}),
    'content-type-builder': yup.object({}),
    'users-permissions': yup.object({}),
  }),
});

/**
 * spm-file-import-permissions.js controller
 *
 * @description: TODO:
 */

module.exports = {
  /**
   * Default action.
   * @description: TODO:
   *
   * @return {Object}
   */

  index: async ctx => {
    // Send 200 `ok`

    ctx.send({
      message: 'ok',
    });
  },
  uploadPermissionsJSON: async ctx => {
    const { user } = ctx.state;
    if (user.roles[0].code !== 'strapi-super-admin') {
      return ctx.unauthorized('You must be an admin to import permissions.');
    }

    const { rolesAndPermissions: rolesFromSource } = ctx.request.body;
    if (!Array.isArray(rolesFromSource))
      throw new Error('Your file format is invalid. Must be an array.');

    const service =
      strapi.plugins['users-permissions'].services.userspermissions;

    const isValidJSON = await Promise.all(
      rolesFromSource.map(async role => roleYupSchema.isValid(role))
    ).then(values => values.every(Boolean));

    if (!isValidJSON) {
      return ctx.throw(400, 'Please provide a valid JSON');
    }

    const [currentEnvRoles, plugins] = await Promise.all([
      service.getRoles(),
      service.getPlugins(),
    ]);

    // Backfill/conform roles
    await Promise.all(
      rolesFromSource.map(async roleFromSource => {
        const roleToUpdate = currentEnvRoles.find(
          role => role.name === roleFromSource.name
        );

        const users = roleToUpdate ? roleToUpdate.users : [];
        roleFromSource.users = users;

        // Backfill missing role.
        if (!roleToUpdate)
          return service.createRole(roleFromSource).catch(err => {
            console.error(
              '[Error:Migrate] Failed to backfill missing role .createRole(), ',
              err
            );
          });
      })
    );

    // Verify that Source and Current Environment contains the same permissions.
    const sampleSrcRole = rolesFromSource[0];
    const sampleCurrRole = currentEnvRoles.find(role => {
      return role.name === sampleSrcRole.name;
    });
    const sampleCurrentEnvRole = await service.getRole(
      sampleCurrRole.id,
      plugins
    );

    const sampleSrcPermTypes = Object.keys(sampleSrcRole.permissions);
    const sampleCurrPermTypes = Object.keys(sampleCurrentEnvRole.permissions);

    if (sampleSrcPermTypes.length !== sampleCurrPermTypes.length) {
      // Get the array that's bigger
      // Check which value doesn't exist in smaller array

      const extraPermsArray =
        sampleSrcPermTypes.length > sampleCurrPermTypes.length
          ? sampleSrcPermTypes
          : sampleCurrPermTypes;

      const missingPermsArray =
        sampleSrcPermTypes.length < sampleCurrPermTypes.length
          ? sampleSrcPermTypes
          : sampleCurrPermTypes;

      extraPermsArray.map(permission => {
        if (!missingPermsArray.includes(permission)) {
          // "This permission is missing in one of the envs."
          throw new Error(
            `The permission "${permission}" is missing from one of the Environments.`
          );
        }

        return null;
      });
    }

    // Updates roles
    await Promise.all(
      rolesFromSource.map(async roleFromSource => {
        const roleToUpdate = currentEnvRoles.find(
          role => role.name === roleFromSource.name
        );

        const users = roleToUpdate ? roleToUpdate.users : [];
        roleFromSource.users = users;

        return service
          .updateRole(roleToUpdate.id, roleFromSource)
          .catch(err => {
            console.error('[Error:Migrate] Failed to .updateRole(), ', err);
          });
      })
    );

    return { success: true };
  },
};

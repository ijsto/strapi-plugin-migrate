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
    const { rolesAndPermissions } = ctx.request.body;
    const { user } = ctx.state;

    const service =
      strapi.plugins['users-permissions'].services.userspermissions;

    if (user.roles[0].id != 1) {
      return ctx.unauthorized('You must be an admin to import permissions.');
    }

    const roleValues = Object.values(rolesAndPermissions);

    const isValidJSON = await Promise.all(
      roleValues.map(async role => roleYupSchema.isValid(role))
    ).then(values => values.every(Boolean));

    if (!isValidJSON) {
      return ctx.throw(400, 'Please provide a valid JSON');
    }

    await Promise.all(
      roleValues.map(async data => {
        const role = await strapi
          .query('role', 'users-permissions')
          .findOne({ name: data.name });

        const users = role ? role.users : [];
        data.users = users;

        if (!role) return service.createRole(data);

        return service.updateRole(role.id, data);
      })
    );

    return { success: true };
  },
};

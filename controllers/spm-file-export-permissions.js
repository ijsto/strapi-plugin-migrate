const { sanitizeEntity } = require('strapi-utils');

/**
 * spm-file-export-permissions.js controller
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
  getPermissionsJSON: async ctx => {
    const { user } = ctx.state;
    const service =
      strapi.plugins['users-permissions'].services.userspermissions;

    // Administrator role ID by default is 1, so we check for admin rights.
    if (user.roles[0].id !== 1) {
      return ctx.unauthorized('You must be an admin to export permissions.');
    }

    const [roles, plugins] = await Promise.all([
      service.getRoles(),
      service.getPlugins(),
    ]);

    const rolesWithPermissions = await Promise.all(
      roles.map(async role => service.getRole(role.id, plugins))
    );

    const sanitizedRolesArray = rolesWithPermissions.map(role =>
      sanitizeEntity(role, {
        model: strapi.plugins['users-permissions'].models.role,
      })
    );

    const formattedRolesJson = sanitizedRolesArray.reduce(
      (accumulatedRoles, role) => {
        // We remove id because the IDs may differ between environments.
        // We use role.name to identify a given role.
        delete role.id;
        delete role.created_by;
        delete role.updated_by;
        accumulatedRoles[role.name] = role;
        return accumulatedRoles;
      },
      {}
    );

    return formattedRolesJson;
  },
};

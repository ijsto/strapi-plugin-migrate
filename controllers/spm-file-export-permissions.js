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
  exportRolesAndPermissions: async ctx => {
    const { user } = ctx.state;
    const service =
      strapi.plugins['users-permissions'].services.userspermissions;

    if (user.roles[0].id != 1) {
      return ctx.unauthorized('You must be admin to access this resource!');
    }

    const [roles, plugins] = await Promise.all([
      service.getRoles(),
      service.getPlugins(),
    ]);

    const rolesWithPermissions = await Promise.all(
      roles.map(async role => await service.getRole(role.id, plugins))
    );

    const sanitizedRolesWithPermissions = rolesWithPermissions
      .map(role =>
        sanitizeEntity(role, {
          model: strapi.plugins['users-permissions'].models.role,
        })
      )
      .reduce((roles, role) => {
        delete role.users;
        delete role.id;
        delete role.created_by;
        delete role.updated_by;
        roles[role.name] = role;
        return roles;
      });

    return sanitizedRolesWithPermissions;
  },
};

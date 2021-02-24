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
  getPermissions: async ctx => {
    const { user } = ctx.state;
    if (user.roles[0].code !== 'strapi-super-admin') {
      return ctx.unauthorized('You must be an admin to export permissions.');
    }
    
    const service =
      strapi.plugins['users-permissions'].services.userspermissions;

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

    const formattedPermissions = sanitizedRolesArray.map(role => {
      const sanitizedPermission = {
        description: role.description,
        name: role.name,
        type: role.type,
      }
      return sanitizedPermission
    })

    return formattedPermissions;
  },
  getPermissionsJSON: async ctx => {
    const { user } = ctx.state;
    if (user.roles[0].code !== 'strapi-super-admin') {
      return ctx.unauthorized('You must be an admin to export permissions.');
    }

    const service =
      strapi.plugins['users-permissions'].services.userspermissions;

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

    return sanitizedRolesArray
  }
};

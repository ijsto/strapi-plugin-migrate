'use strict';

/**
 * migrate.js controller
 *
 * @description: A set of functions called "actions" of the `strapi-plugin-migrate` plugin.
 */

module.exports = {
  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async ctx => {
    // Send 200 `ok`
    ctx.send({
      message: 'ok',
    });
  },
  uploadPostgres: async ctx => {
    try {
      const importedString = ctx.request.body.postgresString;

      const rolesAPI = strapi.query('role', 'users-permissions');
      const roles = await rolesAPI.find({ _limit: -1 });

      let updatedString = importedString;
      roles.map(role => {
        const toReplace = `${role.type}_ID_TBR`;
        const replacer = new RegExp(toReplace, 'g');
        updatedString = updatedString.replace(replacer, role.id);
        return updatedString;
      });

      await strapi.connections.default.raw(updatedString);

      return { success: true };
    } catch (err) {
      throw new Error(err);
    }
  },
  retrieveCurrentRoles: async () => {
    try {
      const rolesAPI = strapi.query('role', 'users-permissions');
      const roles = await rolesAPI.find({ _limit: -1 });

      return { currentRoles: roles };
    } catch (err) {
      throw new Error(err);
    }
  },
  retrieveSqlString: async () => {
    const permissionsAPI = strapi.query('permission', 'users-permissions');
    const permissions = await permissionsAPI.find({ _limit: -1 });

    const generatedString = permissions
      .map(permission => {
        const enabled = permission.enabled ? 'true' : 'false';
        const { action, controller, type, role } = permission;

        return `UPDATE "users-permissions_permission" SET "enabled" = ${enabled} WHERE "type" = '${type}' AND "controller" = '${controller}' AND "action" = '${action}' AND "role" = ${role.type}_ID_TBR`;
      })
      .join(';');

    return { generatedString };
  },
  backUpCurrentPermissions: async () => {
    const permissionsAPI = strapi.query('permission', 'users-permissions');
    const permissions = await permissionsAPI.find({ _limit: -1 });

    const generatedString = permissions
      .map(permission => {
        const enabled = permission.enabled ? 'true' : 'false';
        const { action, controller, type, role } = permission;

        return `UPDATE "users-permissions_permission" SET "enabled" = ${enabled} WHERE "type" = '${type}' AND "controller" = '${controller}' AND "action" = '${action}' AND "role" = ${role.id}`;
      })
      .join(';');

    return { generatedString };
  },
};

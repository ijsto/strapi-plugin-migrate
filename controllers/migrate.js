'use strict';

/**
 * migrate.js controller
 *
 * @description: A set of functions called "actions" of the `strapi-plugin-migrate` plugin.
 */

// const tableName = '"users-permissions_permission"';

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
    // @TODO: Create check that ensures that the query string IDs match the ones in the DB
    try {
      await strapi.connections.default.raw(ctx.request.body.postgresString);

      return { success: true };
    } catch (err) {
      throw new Error(err);
    }
  },
  retrieveCurrentRoles: async () => {
    try {
      const currentRoles = await strapi.connections.default.raw(
        `SELECT * FROM public."users-permissions_role" ORDER BY type ASC`,
      );

      return { currentRoles: currentRoles.rows };
    } catch (err) {
      throw new Error(err);
    }
  },
  retrieveSqlString: async ctx => {
    const { updatedRoles } = ctx.request.body;
    if (!updatedRoles) throw new Error('No user roles data was received.');

    try {
      const result = await strapi.connections.default.raw(
        `SELECT * FROM public."users-permissions_permission"`,
      );

      const generatedString = result.rows
        .map(row => {
          const enabled = row.enabled ? 'true' : 'false';
          const { action, controller, role: currentRoleId, type } = row;

          if (updatedRoles) {
            const found = updatedRoles.find(
              updatedOne => updatedOne.id === currentRoleId,
            );

            if (found) {
              return `UPDATE "users-permissions_permission" SET "enabled" = ${enabled} WHERE "type" = '${type}' AND "controller" = '${controller}' AND "action" = '${action}' AND "role" = ${found.newId ||
                found.id}`;
            }
          }

          throw new Error('Error in retrieving SQL String');
        })
        .join(';');

      return { generatedString };
    } catch (err) {
      throw new Error(err);
    }
  },
};

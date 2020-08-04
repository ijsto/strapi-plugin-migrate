'use strict';

/**
 * migrate.js controller
 *
 * @description: A set of functions called "actions" of the `strapi-plugin-migrate` plugin.
 */

const tableName = '\"users-permissions_permission\"';

module.exports = {

  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async (ctx) => {
    // Send 200 `ok`
    ctx.send({
      message: 'ok'
    });
  },
  uploadPostgres: async (ctx) => {
    const result = await strapi.connections.default.raw(
      ctx.request.body.postgresString
    ).catch(err => { throw new Error(err) });

    return { success: true }
  },
  retrieveSqlString: async (ctx) => {
    const result = await strapi.connections.default.raw(
      `SELECT * FROM public."users-permissions_permission"`
    ).catch(err => { throw new Error(err) });

    const generatedString = result.rows.map(row => {
      const enabled = row.enabled ? "true" : "false"
      const { action, controller, role, type } = row
      return `UPDATE "users-permissions_permission" SET "enabled" = ${enabled} WHERE "type" = '${type}' AND "controller" = '${controller}' AND "action" = '${action}' AND "role" = ${role}`;
    }).join(";")

    return { generatedString }
  }
};

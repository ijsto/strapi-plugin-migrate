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
    console.log("Heya", ctx.request.body);

    const result = await strapi.connections.default.raw(
      ctx.request.body.postgresString
    );
  }
};

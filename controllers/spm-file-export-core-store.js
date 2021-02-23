const { sanitizeEntity } = require('strapi-utils');

/**
 * spm-file-export-core-store.js controller
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
  getCoreStoreJSON: async ctx => {
    const { user } = ctx.state;
    // Administrator role ID by default is 1, so we check for admin rights.
    if (user.roles[0].id !== 1) {
      return ctx.unauthorized('You must be an admin to export permissions.');
    }

    const coreStoreAPI = strapi.query('core_store');
    const coreStore = await coreStoreAPI.find({ _limit: -1 });
    const withoutIds = coreStore.map(({id, ...coreStoreNoIds}) => coreStoreNoIds)

    return withoutIds;
  }
};

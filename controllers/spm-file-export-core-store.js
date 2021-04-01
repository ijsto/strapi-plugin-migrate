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
    const { model } = ctx.params;

    if (user.roles[0].code !== 'strapi-super-admin') {
      return ctx.unauthorized('You must be an admin to export settings and layouts.');
    }

    const queryOptions = { _limit: -1 };
    if (model) {
      const prefix = 'plugin_content_manager_configuration_content_types::';
      queryOptions.key = prefix + model;
    }

    const coreStoreAPI = strapi.query('core_store');
    const coreStore = await coreStoreAPI.find(queryOptions);
    const withoutIds = coreStore.map(({id, ...coreStoreNoIds}) => coreStoreNoIds)

    return withoutIds;
  }
};
/**
 * spm-file-import-core-store.js controller
 *
 * @description: @TODO:
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
  uploadCoreStoreJSON: async ctx => {
    try {
      const { coreStore } = ctx.request.body;

      const coreStoreAPI = strapi.query('core_store');

      await Promise.all(
        coreStore.map(async data => {
          const isFound = await strapi
            .query('core_store')
            .findOne({ key: data.key });

          if (!isFound) return coreStoreAPI.create(data);

          return coreStoreAPI.update({ key: data.key }, data);
        })
      );

      return { success: true };
    } catch (err) {
      throw new Error(err);
    }
  },
};

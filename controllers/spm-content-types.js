'use strict';

/**
 * spm-content-types.js controller
 *
 * @description: Handles content - Collection Types, Single Types, and other models
 */

module.exports = {
  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async ctx => {
    // Send 200 `ok`
    const models = Object.keys(strapi.models)

    ctx.send({
      message: 'ok',
    });
  },
  getModels: async () => {
    try {
      const models = Object.values(strapi.models)

      const sanitizedModels = models.map(model => {
        const sanitizedModel = {
          collectionName: model.collectionName,
          kind: model.kind,
          name: model.info.name,
        }
        return sanitizedModel
      })

      return sanitizedModels;
    } catch (err) {
      throw new Error(err);
    }
  },
};

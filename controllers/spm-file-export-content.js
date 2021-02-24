const { sanitizeEntity } = require('strapi-utils');

/**
 * migrate.js controller
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
  getContentJSON: async ctx => {
    // @NOTE: This controller is work in progress.
    // To track progress/contribute/submit a PR
    // visit this github link: https://github.com/ijsto/strapi-plugin-migrate/issues/6
    const { user } = ctx.state;
    if (!user.roles || user.roles[0].code !== 'strapi-super-admin') {
      return ctx.unauthorized('You must be an admin to export content.');
    }

    const models = Object.values(strapi.models);

    const modelsData = await Promise.all(
      models.map(async model => {
        if (!model.modelName) return;

        const modelAPI = strapi.query(model.modelName);
        const allModelEntries = await modelAPI.find({ _limit: -1 });

        if (Array.isArray(allModelEntries)) {
          allModelEntries.collectionName = model.modelName;
          return { [model.modelName]: allModelEntries };
        }

        const sanitized = allModelEntries
          .map(m => sanitizeEntity(m, { model }))
          .filter(collection => collection);

        return sanitized;
      })
    );

    return modelsData;
  },
};

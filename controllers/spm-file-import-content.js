const { sanitizeEntity } = require('strapi-utils');

/**
 * spm-file-import-content.js controller
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
  uploadContentJSON: async ctx => {
    // @NOTE: This controller is work in progress.
    // To track progress/contribute/submit a PR
    // visit this github link: https://github.com/ijsto/strapi-plugin-migrate/issues/6
    const { user } = ctx.state;
    if (user.roles[0].code !== 'strapi-super-admin') {
      return ctx.unauthorized('You must be an admin to import content.');
    }

    const { collectionTypes } = ctx.request.body;
    const collectionTypesKeys = Object.keys(collectionTypes);

    // Potential flow #1 (replace) [wip] [help-wanted]
    // // query all existing data
    // // export
    // // on import:
    // // delete all existing data in new environment
    // // reset ID index (depends on DB type for RAW query)
    // // import exported data
    
    // Potential flow #2 (update) [wip] [help-wanted]
    // // strapi.*.query().update({id: data.id, ...data})
    // // strapi.*.query().create(data)

    await Promise.all(
      collectionTypesKeys.map(async typeKey => {
        const model = strapi.models[typeKey];
        const typeService = strapi.services[typeKey];

        const typeData = collectionTypes[typeKey];
        typeData.map(async entryData => {
          const sanitizedData = sanitizeEntity(entryData, { model });
          delete sanitizedData.id;
          delete sanitizedData.updated_by;
          delete sanitizedData.created_by;

          if (model.kind === 'collectionType') {
            const found = await typeService.find(sanitizedData);

            if (!found.length) {
              await typeService.create(sanitizedData);
            } else {
              await typeService.update(entryData.id, sanitizedData);
            }
          }
        });
      })
    );

    return { success: true };
  },
};

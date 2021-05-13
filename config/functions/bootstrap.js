const pluginPkg = require('../../package.json');

module.exports = async () => {
    registerPermissionActions();
};

const registerPermissionActions = () => {
    const { name } = pluginPkg;

    const actions = [
        {
            section: 'settings',
            displayName: 'Access the Migrate pages in the settings',
            uid: 'settings.access',
            category: 'migrate',
            pluginName: name
        },
    ];

    const { actionProvider } = strapi.admin.services.permission;
    actionProvider.registerMany(actions);
};
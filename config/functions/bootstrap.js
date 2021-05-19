module.exports = async () => {
    registerPermissionActions();
};

const registerPermissionActions = () => {
    const actions = [
        {
            section: 'settings',
            displayName: 'Access migrate pages in the settings',
            uid: 'settings.access',
            category: 'migrate',
            pluginName: 'migrate'
        },
    ];

    const { actionProvider } = strapi.admin.services.permission;
    actionProvider.registerMany(actions);
};
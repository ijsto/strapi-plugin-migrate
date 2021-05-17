module.exports = async () => {
    registerPermissionActions();
};

const registerPermissionActions = () => {
    const actions = [
        {
            section: 'settings',
            displayName: 'Access the Migrate pages in the settings',
            uid: 'settings.access',
            category: 'migrate',
            pluginName: 'migrate'
        },
    ];

    const { actionProvider } = strapi.admin.services.permission;
    actionProvider.registerMany(actions);
};
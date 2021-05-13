const pluginPkg = require('../../package.json');

const pluginPermissions = {
    settings: [
        { action: `plugins::${pluginPkg.name}.settings.access`, subject: null }
    ]
};

export default pluginPermissions;
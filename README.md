<p align="center">
<img width="500px" src="https://github.com/ijsto/strapi-plugin-migrate/blob/main/admin/src/assets/images/readme-jumbo.png?raw=true"/>
</p>

# Strapi `plugin` Migrate

## About

Strapi Plugin Migrate let's you easily transfer user permissions, settings, and layouts between your Strapi instances.

<details><summary><span>More info</span></summary>
<p>
For an example, let's consider User Permissions - when you configure User Permissions for routes and roles in, for example, `development`, these settings are stored in your database and therefore are not transferred to your `production` environment.

Until now normally you would have to manually sync these checkboxes in your target environment. `strapi-plugin-migrate` enables you to simply export a file from your `development` environment (or any other) to `production` (or any other).

Similarly - `strapi-plugin-migrate` enables the same for layout configuration and Strapi app Settings.
<!-- TODO: Add paragraph with description of what's included in Settings. -->

</p>
</details>

<hr />

## Quick start

1 - Install the plugin in your Strapi project

```bash
npm i strapi-plugin-migrate
```

or

```
yarn add strapi-plugin-migrate
```

2 - Rebuild your Strapi app and clean your cache

```bash
yarn build --clean && yarn dev
```

or

```bash
npm cache clean --force && npm run dev
```

3 - Go to Sidebar Menu > Migrate Strapi

4 - Export your data by downloading a JSON file or Copying the Text string

5 - Import your data in the target environment

## Updating to new version

When updating to a new version, you will need to rebuild your Strapi admin UI for the changes to take effect.

This is how we would update to the latest version:

from your Strapi project root folder:

```bash
yarn add strapi-plugin-migrate@latest && yarn build --clean
```

## Contributing to/Developing this plugin

Thank you for considering to contribute! To find out please read the [CONTRIBUTING.md](https://github.com/ijsto/strapi-plugin-migrate/blob/master/CONTRIBUTING.md).

Please make sure you read the contirbuting guide before making a PR.

#### Credits

Parts of the initial concept for a module in users permissions file JSON export was inspired by [@Alan2207](https://github.com/alan2207/strapi-plugin-sync-roles-permissions)

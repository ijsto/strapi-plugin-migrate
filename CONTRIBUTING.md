# Contributing/Developing

<details>
  <summary>Using Apple Silicon M1?</summary>

_For users running on Apple Silicon M1, you may encounter errors thrown by `sharp`. You may need to re-install `libvps` or to build `sharp` manually following [this issue comment](https://github.com/lovell/sharp/issues/2460#issuecomment-751491241) in order to start the project._

</details>

### Prerequisites

First, check if you're using the [required versions of Node.js and npm](https://strapi.io/documentation/developer-docs/latest/installation/cli.html#step-1-make-sure-requirements-are-met).

The easiest (and at this point in time the best way) to develop this plugin is by adding it to an existing project by placing it into `/plugins` folder.
The below steps will help you to set up this on a fresh project, if you would like to add it to your project, omit the first 2 steps and start with step 3.

### 1. Fork a fresh Strapi (Playground) project [repository](https://github.com/ijsto/strapi-plugin-migrate)

- Fork the [Strapi Playground repository](https://github.com/ijsto/strapi-playground) to your own account.

### 2. Clone the Playground your computer

_replace `YOUR_USERNAME` with your username 🙂_

```bash
git clone git@github.com:YOUR_USERNAME/strapi-playground.git
```

### 3. Fork the [plugin repository](https://github.com/ijsto/strapi-plugin-migrate)

- Fork the [Strapi Plugin Migrate repository](https://github.com/ijsto/strapi-plugin-migrate) to your own account.

### 4. Clone Strapi Plugin Migrate to your project's `/plugins` folder.

_replace `YOUR_USERNAME` with your username 🙂_

```bash
mkdir plugins && cd plugins && git clone git@github.com:YOUR_USERNAME/strapi-plugin-migrate.git migrate
```

_If you are cloning to an existing project with an existing `plugins` folder, omit the `mkdir plugins`_

### 5. Develop

You'll need to rebuild admin UI and start development from Strapi root folder.

```bash
cd .. && yarn && yarn build --clean && strapi develop --watch-admin
```

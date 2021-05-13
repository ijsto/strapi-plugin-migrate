import React from 'react';

import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import pluginLogo from './assets/images/logo.png';

import Initializer from './containers/Initializer';
import lifecycles from './lifecycles';
import trads from './translations';
import getTrad from './utils/getTrad';
import basePluginUrl from './basePluginUrl';
import pluginPermissions from './permissions';
import { CheckPagePermissions } from 'strapi-helper-plugin';

// Containers
import CoreStorePage from './containers/CoreStorePage';
import CollectionTypesPage from './containers/CollectionTypesPage';
import HomePage from './containers/HomePage';
import UserPermissionsPage from './containers/UserPermissionsPage';

export default strapi => {
  const pluginDescription =
    pluginPkg.strapi.description || pluginPkg.description;
  const { icon, name } = pluginPkg.strapi;

  const plugin = {
    blockerComponent: null,
    blockerComponentProps: {},
    description: pluginDescription,
    icon,
    id: pluginId,
    initializer: Initializer,
    injectedComponents: [],
    isReady: false,
    isRequired: pluginPkg.strapi.required || false,
    layout: null,
    lifecycles,
    pluginLogo,
    mainComponent: null,
    name,
    preventComponentRendering: false,
    trads,
    settings: {
      menuSection: {
        id: pluginId,
        title: getTrad('Settings.sectionHeading'),
        links: [
          {
            title: {
              id: getTrad('Sidebar.link.dashboard'),
              defaultMessage: 'Dashboard',
            },
            name: 'dashboard',
            to: `${basePluginUrl}/dashboard`,
            Component: () => (
              <CheckPagePermissions permissions={pluginPermissions.settings}>
                <HomePage />
              </CheckPagePermissions>
            ),
            permissions: pluginPermissions.settings,
          },
          {
            title: {
              id: getTrad('Sidebar.link.userPermissions'),
              defaultMessage: 'User Permissions',
            },
            name: 'userPermissions',
            to: `${basePluginUrl}/user-permissions`,
            Component: () => (
              <CheckPagePermissions permissions={pluginPermissions.settings}>
                <UserPermissionsPage />
              </CheckPagePermissions>
            ),
            permissions: pluginPermissions.settings,
          },
          {
            title: {
              id: getTrad('Sidebar.link.coreStore'),
              defaultMessage: 'Settings & Layouts',
            },
            name: 'coreStore',
            to: `${basePluginUrl}/core-store`,
            Component: () => (
              <CheckPagePermissions permissions={pluginPermissions.settings}>
                <CoreStorePage />
              </CheckPagePermissions>
            ),
            permissions: pluginPermissions.settings,
          },
          {
            title: {
              id: getTrad('Sidebar.link.collectionTypes'),
              defaultMessage: 'Collection Types',
            },
            name: 'collectionTypes',
            to: `${basePluginUrl}/collection-types`,
            Component: () => (
              <CheckPagePermissions permissions={pluginPermissions.settings}>
                <CollectionTypesPage />
              </CheckPagePermissions>
            ),
            permissions: pluginPermissions.settings,
          },
        ],
      },
    },
  };

  return strapi.registerPlugin(plugin);
};

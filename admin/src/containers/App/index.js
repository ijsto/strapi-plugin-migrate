/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Switch, Redirect, Route } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { NotFound } from 'strapi-helper-plugin';
// Utils
import pluginId from '../../pluginId';
import basePluginUrl from '../../basePluginUrl';

// Containers
import CollectionTypesPage from '../CollectionTypesPage';
import HomePage from '../HomePage';
import UserPermissionsPage from '../UserPermissionsPage';

const App = () => {
  return (
    <div>
      <Switch>
        <Route
          path={`${basePluginUrl}`}
          render={() => <HomePage />}
          exact
        />
        
        <Route
          path={`${basePluginUrl}/user-permissions`}
          render={() => <UserPermissionsPage />}
        />
        
        <Route
          path={`${basePluginUrl}/collection-types`}
          render={() => <CollectionTypesPage />}
        />
        
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;

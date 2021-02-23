/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Switch, Route } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { NotFound } from 'strapi-helper-plugin';
// Utils
import Wrapper from './Wrapper';
import basePluginUrl from '../../basePluginUrl';

// Containers
import CoreStorePage from '../CoreStorePage';
import CollectionTypesPage from '../CollectionTypesPage';
import HomePage from '../HomePage';
import UserPermissionsPage from '../UserPermissionsPage';

const App = () => {
  return (
    <Wrapper>
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
          path={`${basePluginUrl}/core-store`}
          render={() => <CoreStorePage />}
        />
        
        <Route
          path={`${basePluginUrl}/collection-types`}
          render={() => <CollectionTypesPage />}
        />
        
        <Route component={NotFound} />
      </Switch>
    </Wrapper>
  );
};

export default App;

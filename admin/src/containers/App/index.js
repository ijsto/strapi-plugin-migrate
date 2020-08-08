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

// Containers
import HomePage from '../HomePage';

const App = () => {
  return (
    <div>
      <Switch>
        <Route
          path={`/plugins/${pluginId}/:settingType/:action`}
          render={() => <HomePage />}
          exact
        />

        <Route
          path={`/plugins/${pluginId}`}
          render={() => (
            <Redirect to={`/plugins/${pluginId}/user-permissions/export`} />
          )}
          exact
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;

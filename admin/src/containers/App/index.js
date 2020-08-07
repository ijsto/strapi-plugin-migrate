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
import pluginId from '../../pluginId';

// Containers
import HomePage from '../HomePage';

const App = () => {
  return (
    <div>
      <Switch>
        <Route
          path={`/plugins/${pluginId}/:settingType/:action`}
          render={props => <HomePage {...props} />}
          exact
        />

        <Route path={`/plugins/${pluginId}`} component={HomePage} exact />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;

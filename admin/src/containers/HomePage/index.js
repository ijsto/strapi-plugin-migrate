/*
 *
 * HomePage
 *
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import React, { memo } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ViewContainer } from 'strapi-helper-plugin';

// import PropTypes from 'prop-types';
import UserPermissions from '../../components/UserPermissions';
import pluginId from '../../pluginId';
import Sidebar from '../Sidebar';

const HomePage = () => {
  return (
    <ViewContainer className={pluginId}>
      <div className="container-fluid">
        <div className="row">
          <Sidebar />

          <div className="col-md-9">
            <UserPermissions />
          </div>
        </div>
      </div>
    </ViewContainer>
  );
};

export default memo(HomePage);

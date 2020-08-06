/*
 *
 * HomePage
 *
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import pluginId from '../../pluginId';
import UserPermissions from '../../components/UserPermissions';

const HomePage = () => {
  return <UserPermissions />;
};

export default memo(HomePage);

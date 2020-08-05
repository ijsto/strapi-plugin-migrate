/*
 *
 * HomePage
 *
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import pluginId from '../../pluginId';
import UserPermissionsMigrator from '../../components/UserPermissionsMigrator';

const HomePage = () => {
  return <UserPermissionsMigrator />;
};

export default memo(HomePage);

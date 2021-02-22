/*
 *
 * UserPermissionsPage
 *
 */

import React, { memo } from 'react';
import { useGlobalContext } from 'strapi-helper-plugin';

// import PropTypes from 'prop-types';
import getTrad from '../../utils/getTrad';
import PageContainer from '../../components/layout/PageContainer';

import UserPermissions from '../../components/UserPermissions';

const UserPermissionsPage = () => {
  const { formatMessage } = useGlobalContext();
  const headerProps = {
    content: formatMessage({ id: getTrad(`UserPermissions.header.description`) }),
    title: { label: formatMessage({ id: getTrad(`UserPermissions.header.title`) }) },
  };

  return (
    <PageContainer headerProps={headerProps}>
      <UserPermissions />
    </PageContainer>
  );
};

export default memo(UserPermissionsPage);

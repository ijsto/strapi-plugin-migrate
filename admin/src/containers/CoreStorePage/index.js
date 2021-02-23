/*
 *
 * CoreStorePage
 *
 */

import React, { memo } from 'react';
import { useGlobalContext } from 'strapi-helper-plugin';

// import PropTypes from 'prop-types';
import PageContainer from '../../components/layout/PageContainer';
import CoreStore from '../../components/CoreStore';

import getTrad from '../../utils/getTrad';

const CoreStorePage = () => {
  const { formatMessage } = useGlobalContext();
  const headerProps = {
    content: formatMessage({ id: getTrad(`CoreStore.header.description`) }),
    title: { label: formatMessage({ id: getTrad(`CoreStore.header.title`) }) },
  };

  return (
    <PageContainer headerProps={headerProps}>
      <CoreStore />
    </PageContainer>
  );
};

export default memo(CoreStorePage);

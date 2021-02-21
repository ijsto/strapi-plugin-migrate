/*
 *
 * HomePage
 *
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import React, { memo } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useGlobalContext } from 'strapi-helper-plugin';

// import PropTypes from 'prop-types';
import getTrad from '../../utils/getTrad';
import PageContainer from '../../components/layout/PageContainer';
import Dashboard from '../../components/Dashboard';


const HomePage = () => {
  const { formatMessage } = useGlobalContext();
  const headerProps = {
    content: formatMessage({ id: getTrad(`HomePage.header.description`) }),
    title: { label: formatMessage({ id: getTrad(`HomePage.header.title`) }) },
  };

  return (
    <PageContainer headerProps={headerProps}>
      <Dashboard />
    </PageContainer>
  );
};

export default memo(HomePage);

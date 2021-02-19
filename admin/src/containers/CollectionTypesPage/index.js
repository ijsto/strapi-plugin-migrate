/*
 *
 * Collection Types Page
 *
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import { useGlobalContext } from 'strapi-helper-plugin';

import CollectionTypes from '../../components/CollectionTypes';
import getTrad from '../../utils/getTrad';
import PageContainer from '../../components/layout/PageContainer';

const CollectionTypesPage = () => {
  const { formatMessage } = useGlobalContext();
  const headerProps = {
    content: formatMessage({
      id: getTrad(`CollectionTypes.header.description`),
    }),
    title: {
      label: formatMessage({ id: getTrad(`CollectionTypes.header.title`) }),
    },
  };

  return (
    <PageContainer headerProps={headerProps}>
      <CollectionTypes />
    </PageContainer>
  );
};

export default CollectionTypesPage;

import React from 'react';
import { useGlobalContext } from 'strapi-helper-plugin';

import { Flex } from '@buffetjs/core';
import getTrad from '../../utils/getTrad';
import ExportCollectionsText from './ExportCollectionsText';
import ExportCollectionsFile from './ExportCollectionsFile';


const ExportCollections = () => {
  const { formatMessage } = useGlobalContext();

  return (
    <div>
      <h1>{formatMessage({ id: getTrad(`CollectionTypes.export.title`) })}</h1>

      <Flex>
        <ExportCollectionsText />

        <ExportCollectionsFile />
      </Flex>
    </div>
  );
};

export default ExportCollections;

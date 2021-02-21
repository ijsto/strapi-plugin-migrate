import React from 'react';
import { useGlobalContext } from 'strapi-helper-plugin';
import { Flex, Padded } from '@buffetjs/core';

import getTrad from '../../utils/getTrad';
import ExportPermissionsText from './ExportPermissionsText';
import ExportPermissionsFile from './ExportPermissionsFile';


const ExportPermissions = () => {
  const { formatMessage } = useGlobalContext();

  return (
    <div>
      <h1>{formatMessage({ id: getTrad(`UserPermissions.export.title`) })}</h1>

      <Flex>
        <ExportPermissionsFile />

        <Padded right size="smd" />

        <ExportPermissionsText />
      </Flex>
    </div>
  );
};

export default ExportPermissions;

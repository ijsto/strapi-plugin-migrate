import React from 'react';
import { Flex } from '@buffetjs/core';
import { useGlobalContext } from 'strapi-helper-plugin';

import ImportPermissionsText from './ImportPermissionsText';
import ImportPermissionsFile from './ImportPermissionsFile';

const ImportPermissions = () => {
  const { formatMessage } = useGlobalContext();

  return (
    <div>
      <Flex>
        <ImportPermissionsFile />

        <ImportPermissionsText />
      </Flex>
    </div>
  );
};

export default ImportPermissions;

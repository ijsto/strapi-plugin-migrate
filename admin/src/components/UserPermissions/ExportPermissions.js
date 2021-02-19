import React from 'react';
import { useGlobalContext } from 'strapi-helper-plugin';

import Flex from '../layout/Flex';
import getTrad from '../../utils/getTrad';
import ExportPermissionsText from './ExportPermissionsText';
import ExportPermissionsFile from './ExportPermissionsFile';


const ExportPermissions = () => {
  const { formatMessage } = useGlobalContext();

  return (
    <div>
      <h1>{formatMessage({ id: getTrad(`UserPermissions.export.title`) })}</h1>

      <Flex>
        <ExportPermissionsText />

        <ExportPermissionsFile />
      </Flex>
    </div>
  );
};

export default ExportPermissions;

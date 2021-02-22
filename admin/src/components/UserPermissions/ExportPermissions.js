import React from 'react';
import { useGlobalContext } from 'strapi-helper-plugin';

import Box from '../layout/Box';
import Grid from '../layout/Grid';

import getTrad from '../../utils/getTrad';

import ExportPermissionsText from './ExportPermissionsText';
import ExportPermissionsFile from './ExportPermissionsFile';


const ExportPermissions = () => {
  const { formatMessage } = useGlobalContext();

  return (
    <Box>
      <h1>{formatMessage({ id: getTrad(`UserPermissions.export.title`) })}</h1>

      <Grid>
        <ExportPermissionsFile />

        <ExportPermissionsText />
      </Grid>
    </Box>
  );
};

export default ExportPermissions;

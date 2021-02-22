import React from 'react';
import { useGlobalContext } from 'strapi-helper-plugin';

import Box from '../layout/Box';
import Grid from '../layout/Grid';

import getTrad from '../../utils/getTrad';

import ImportPermissionsText from './ImportPermissionsText';
import ExportPermissionsText from './ExportPermissionsText';

const ExportClipboard = () => {
  const { formatMessage } = useGlobalContext();

  return (
    <Box>
      <h1>{formatMessage({ id: getTrad(`UserPermissions.clipboard.export.title`) })}</h1>
      <p>{formatMessage({ id: getTrad(`UserPermissions.clipboard.export.description`) })}</p>
 
      <Box margin="30px 0 0 0">
        <Grid>
          <ExportPermissionsText />

          <ImportPermissionsText />
        </Grid>
      </Box>
    </Box>
  );
};

export default ExportClipboard;

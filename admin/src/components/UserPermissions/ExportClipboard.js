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
      <h1>{formatMessage({ id: getTrad(`UserPermissions.text.export.title`) })}</h1>
      <p>{formatMessage({ id: getTrad(`UserPermissions.text.export.description`) })}</p>
 
      <Grid>
        <ExportPermissionsText />

        <ImportPermissionsText />
      </Grid>
    </Box>
  );
};

export default ExportClipboard;

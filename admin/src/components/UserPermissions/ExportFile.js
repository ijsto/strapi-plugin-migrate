import React from 'react';
import { useGlobalContext } from 'strapi-helper-plugin';

import Box from '../layout/Box';
import Grid from '../layout/Grid';

import getTrad from '../../utils/getTrad';

import ImportPermissionsFile from './ImportPermissionsFile';
import ExportPermissionsFile from './ExportPermissionsFile';


const ExportFile = () => {
  const { formatMessage } = useGlobalContext();

  return (
    <Box>
      <h1>{formatMessage({ id: getTrad(`UserPermissions.file.export.title`) })}</h1>
      <p>{formatMessage({ id: getTrad(`UserPermissions.file.export.description`) })}</p>
 
      <Box margin="30px 0 0 0">
        <Grid>
          <ExportPermissionsFile />

          <ImportPermissionsFile />
        </Grid>
      </Box>
    </Box>
  );
};

export default ExportFile;

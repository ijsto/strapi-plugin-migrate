import React from 'react';
import { useGlobalContext } from 'strapi-helper-plugin';

import Box from '../layout/Box';
import Grid from '../layout/Grid';

import getTrad from '../../utils/getTrad';

import ImportPermissionsText from './ImportPermissionsText';
import ImportPermissionsFile from './ImportPermissionsFile';


const ImportPermissions = () => {
  const { formatMessage } = useGlobalContext();

  return (
    <Box>
      <h1>{formatMessage({ id: getTrad(`UserPermissions.import.title`) })}</h1>

      <Grid>
        <ImportPermissionsFile />

        <ImportPermissionsText />
      </Grid>
    </Box>
  );
};

export default ImportPermissions;

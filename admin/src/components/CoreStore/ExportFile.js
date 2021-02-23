import React from 'react';
import { useGlobalContext } from 'strapi-helper-plugin';

import Box from '../layout/Box';
import Grid from '../layout/Grid';

import getTrad from '../../utils/getTrad';

import ImportCoreStoreFile from './ImportCoreStoreFile';
import ExportCoreStoreFile from './ExportCoreStoreFile';


const ExportFile = () => {
  const { formatMessage } = useGlobalContext();

  return (
    <Box>
      <h1>{formatMessage({ id: getTrad(`CoreStore.file.export.title`) })}</h1>
      <p>{formatMessage({ id: getTrad(`CoreStore.file.export.description`) })}</p>
 
      <Box margin="30px 0 0 0">
        <Grid>
          <ExportCoreStoreFile />

          <ImportCoreStoreFile />
        </Grid>
      </Box>
    </Box>
  );
};

export default ExportFile;

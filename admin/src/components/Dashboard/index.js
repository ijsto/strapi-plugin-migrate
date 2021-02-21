import React from 'react';

import Grid from '../layout/Grid';

import CollectionTypeStats from './CollectionTypeStats';
import UserPermissionStats from './UserPermissionStats';
import Box from '../layout/Box';

const Dashboard = () => {
  return (
    <>
      <h1>Dashboard</h1>

      <Box py="10px">
        <Grid>
          <UserPermissionStats />

          <CollectionTypeStats />
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;

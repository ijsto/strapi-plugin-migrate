import React from 'react';

import SocialShare from '../common/SocialShare';
import Box from '../layout/Box';
import Grid from '../layout/Grid';

import CollectionTypeStats from './CollectionTypeStats';
import SettingsLayoutsStats from './SettingsLayoutsStats';
import UserPermissionStats from './UserPermissionStats';

const Dashboard = () => {
  return (
    <>
      <h1>Dashboard</h1>

      <Box py="10px">
        <Grid>
          <UserPermissionStats />
          
          <SettingsLayoutsStats />

          <CollectionTypeStats />

          <Box my="20px">
            <SocialShare />
          </Box>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;

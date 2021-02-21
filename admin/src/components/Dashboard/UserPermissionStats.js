import React from 'react';
import { Button } from '@buffetjs/core';
import { Link } from 'react-router-dom';

import Box from '../layout/Box';
import Card from '../data-display/Card';
import CardInfoList from '../data-display/CardInfoList';

import basePluginUrl from '../../basePluginUrl';

const UserPermissionStats = () => {
  const infoList = [{ label: 'Total Roles', value: '??' }];

  return (
    <Card padding="0 20px">
      <h3 style={{ marginTop: 16 }}>User Permissions</h3>

      <Box my="20px">
        <CardInfoList list={infoList} />

        <Link to={`${basePluginUrl}/user-permissions`}>
          <Button>Migrate Permissions</Button>
        </Link>
      </Box>
    </Card>
  );
};

export default UserPermissionStats;

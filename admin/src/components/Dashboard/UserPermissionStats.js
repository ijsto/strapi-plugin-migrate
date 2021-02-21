import React, { useEffect, useState } from 'react';
import { Button } from '@buffetjs/core';
import { Link } from 'react-router-dom';
import { request } from 'strapi-helper-plugin';

import Box from '../layout/Box';
import Card from '../data-display/Card';
import CardInfoList from '../data-display/CardInfoList';

import basePluginUrl from '../../basePluginUrl';

const UserPermissionStats = () => {
  const [allRoles, setAllRoles] = useState([]);
  const handlePermissionsExport = async () => {
    try {
      const userRoles = await request(`/migrate/getPermissions`);

      if (userRoles) setAllRoles(userRoles);
    } catch (err) {
      strapi.notification.toggle({
        message: err.toString(),
        timeout: 3500,
        title: 'Yikes!',
        type: 'warning',
      });
    }
  };

  useEffect(() => {
    handlePermissionsExport();
  }, []);

  const infoList = [{ label: 'Total Roles', value: allRoles?.length || 0 }];

  return (
    <Card padding="0 20px">
      <h3 style={{ marginTop: 16 }}>User Permissions</h3>

      <Box>
        <CardInfoList list={infoList} />
      </Box>

      <Box margin="0 0 20px 0">
        You can get up to 30 or even unlimited amount of roles with Strapi paid
        plans. See{' '}
        <a href="https://strapi.io/pricing">https://strapi.io/pricing</a> for
        more info.
      </Box>

      <Box my="20px">
        <Link to={`${basePluginUrl}/user-permissions`}>
          <Button>Migrate Permissions</Button>
        </Link>
      </Box>
    </Card>
  );
};

export default UserPermissionStats;

import React, { useEffect, useState } from 'react';
import { Button, Padded } from '@buffetjs/core';
import { Link } from 'react-router-dom';
import { request } from 'strapi-helper-plugin';

import Card from '../data-display/Card';
import CardInfoList from '../data-display/CardInfoList';

import basePluginUrl from '../../basePluginUrl';

const SettingsLayoutsStats = () => {
  const [allRoles, setAllRoles] = useState([]);
  const handlePermissionsExport = async () => {
    try {
      const userRoles = await request(`/migrate/user-permissions/export`);

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
      <h3 style={{ marginTop: 16 }}>Settings & Layouts</h3>

      <Padded>
        <p>
          You know how you configure things like views and layouts in Development, then go to Staging/Production and suddenly all of that is gone?
        </p>

        <p>Well - gone it is no more! 👵🏼</p>
      </Padded>

      <Padded top bottom size="smd">
        <Link to={`${basePluginUrl}/core-store`}>
          <Button>Migrate Settings & Layouts</Button>
        </Link>
      </Padded>
    </Card>
  );
};

export default SettingsLayoutsStats;

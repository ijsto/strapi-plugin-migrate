/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { Button, Textarea } from '@buffetjs/core';

import { useGlobalContext, request } from 'strapi-helper-plugin';

import Row from '../layout/Row';
import getTrad from '../../utils/getTrad';

const ImportPermissionsText = () => {
  const { formatMessage } = useGlobalContext();
  const [postgresString, setPostgresString] = useState('');

  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleSubmit = async () => {
    if (postgresString?.length < 10) return;

    setLoadingSubmit(true);

    try {
      const response = await request('/migrate/uploadPostgres', {
        method: 'POST',
        body: { postgresString },
      });

      if (response.success) {
        strapi.notification.toggle({
          link: {
            label: "Go to Roles",
            url: "/admin/settings/users-permissions/roles",
          },
          message: 'User permissions exported successfully.',
          timeout: 3500,
          title: 'Woohoo! 🥳',
          type: 'success',
        });
        setPostgresString('');
        setLoadingSubmit(false);
      }
    } catch (e) {
      strapi.notification.toggle({
        message: err.toString(),
        timeout: 3500,
        title: 'Holy guacamole!',
        type: 'warning',
      });
      setLoadingSubmit(false);
    }
  };

  return (
    <div>
      <h1>{formatMessage({ id: getTrad(`UserPermissions.import.title`) })}</h1>

      <div>
        {formatMessage({ id: getTrad(`UserPermissions.import.description`) })}
      </div>
      <Row>
        <Textarea
          name="import-sql-string"
          disabled={loadingSubmit}
          onChange={({ target: { value } }) => setPostgresString(value)}
          value={postgresString}
        />
      </Row>

      <Row>
        <Button
          isLoading={loadingSubmit}
          disabled={loadingSubmit}
          label="Run it"
          onClick={handleSubmit}
        />
      </Row>
    </div>
  );
};

export default ImportPermissionsText;

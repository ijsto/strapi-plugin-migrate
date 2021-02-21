import React, { useState } from 'react';
import { Button } from '@buffetjs/core';
import { useGlobalContext, request } from 'strapi-helper-plugin';

import Box from '../layout/Box';
import Row from '../layout/Row';

import readJsonFromFile from '../../utils/readJsonFromFile';
import getTrad from '../../utils/getTrad';

const ImportPermissionsFile = () => {
  const { formatMessage } = useGlobalContext();
  const [fileForUpload, setFileForUpload] = useState(null);

  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleSubmit = async () => {
    setLoadingSubmit(true);
    try {
      strapi.lockApp();
      await request(`/migrate/uploadPermissionsJSON`, {
        method: 'POST',
        body: {
          rolesAndPermissions: fileForUpload,
        },
      });
      strapi.notification.toggle({
        link: {
          label: "Go to Roles",
          url: "/admin/settings/users-permissions/roles",
        },
        message: 'User permissions were successfully imported.',
        timeout: 3500,
        title: 'Permissions updated! 🥳',
        type: 'success',
      });
      setLoadingSubmit(false);
    } catch (err) {
      strapi.notification.toggle({
        message: err.toString(),
        timeout: 3500,
        title: 'Holy guacamole!',
        type: 'warning',
      });
      setLoadingSubmit(false);
    }
    strapi.unlockApp();
  };

  return (
    <Box px="20px">
      <h1>{formatMessage({ id: getTrad(`UserPermissions.import.title`) })}</h1>

      <div>
        {formatMessage({ id: getTrad(`UserPermissions.import.description`) })}
      </div>

      <Box py="20px">
        <input
          id="upload"
          accept=".json"
          onChange={e => {
            const droppedFiles = e.target.files[0];
            if (droppedFiles) {
              readJsonFromFile(droppedFiles, (value, fileName) => {
                setFileForUpload(value);
              });
            } else {
              setFileForUpload(null);
            }
          }}
          type="file"
        />
      </Box>

      <Row>
        <Button
          isLoading={loadingSubmit}
          disabled={!fileForUpload || loadingSubmit}
          label="Upload"
          onClick={handleSubmit}
        />
      </Row>
    </Box>
  );
};

export default ImportPermissionsFile;

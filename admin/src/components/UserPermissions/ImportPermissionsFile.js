import React, { useState } from 'react';
import { Button, Padded,Text } from '@buffetjs/core';
import { useGlobalContext, request } from 'strapi-helper-plugin';

import Box from '../layout/Box';
import Row from '../layout/Row';

import readJsonFromFile from '../../utils/readJsonFromFile';
import getTrad from '../../utils/getTrad';
import { StyledCardWidgetFile } from './ExportPermissionsFile';

const ImportPermissionsFile = () => {
  const { formatMessage } = useGlobalContext();
  const [fileForUpload, setFileForUpload] = useState(null);
  const [fileForUploadName, setFileForUploadName] = useState(null);

  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleSubmit = async () => {
    setLoadingSubmit(true);
    try {
      strapi.lockApp();
      await request(`/migrate/user-permissions/json/import`, {
        method: 'POST',
        body: {
          rolesAndPermissions: fileForUpload,
        },
      });
      strapi.notification.toggle({
        link: {
          label: 'Go to Roles',
          url: '/admin/settings/users-permissions/roles',
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
    <StyledCardWidgetFile variant="accent" icon="upload">
      <Box>
        {formatMessage({
          id: getTrad(`UserPermissions.file.import.description`),
        })}
      </Box>

      <Box py="20px">
        <input
          id="upload"
          accept=".json"
          onChange={e => {
            const droppedFiles = e.target.files[0];
            if (droppedFiles) {
              readJsonFromFile(droppedFiles, (value, fileName) => {
                setFileForUpload(value);
                setFileForUploadName(fileName);
              });
            } else {
              setFileForUpload(null);
            }
          }}
          style={{ width: 90 }}
          type="file"
        />
      </Box>

      {fileForUploadName && (
        <Padded>
          <h3>You've selected:</h3>
          <Text>{fileForUploadName}</Text>
        </Padded>
      )}

      <Row>
        <Button
          isLoading={loadingSubmit}
          disabled={!fileForUpload || loadingSubmit}
          label="Upload"
          onClick={handleSubmit}
        />
      </Row>
    </StyledCardWidgetFile>
  );
};

export default ImportPermissionsFile;

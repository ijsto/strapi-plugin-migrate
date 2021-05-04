import React, { useState } from 'react';
import { Button, Padded, Text } from '@buffetjs/core';
import { useGlobalContext, request } from 'strapi-helper-plugin';

import Notice from '../feedback/Notice';

import Row from '../layout/Row';

import readJsonFromFile from '../../utils/readJsonFromFile';
import getTrad from '../../utils/getTrad';
import {
  ExportCoreStoreButton,
  StyledCardWidgetFile,
} from './ExportCoreStoreFile';

const ImportCoreStoreFile = () => {
  const { formatMessage } = useGlobalContext();
  const [fileForUpload, setFileForUpload] = useState(null);
  const [fileForUploadName, setFileForUploadName] = useState(null);

  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleSubmit = async () => {
    setLoadingSubmit(true);
    try {
      strapi.lockApp();
      await request(`/migrate/core-store/json/import`, {
        method: 'POST',
        body: {
          coreStore: fileForUpload,
        },
      });
      strapi.notification.toggle({
        message: 'Settings were successfully imported.',
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
    <StyledCardWidgetFile variant="accent" icon="upload" alignSelf="flex-start">
      <Notice>
        <div style={{ position: 'relative' }}>
          <span
            style={{
              bottom: -16,
              fontSize: 41,
              marginRight: 16,
              position: 'absolute',
              right: 0,
            }}
            role="img"
            aria-label="Rocket-launch"
          >
            🚀
          </span>

          <Padded size="sm">
            <h2>Back up</h2>
          </Padded>

          <Padded bottom size="smd">
            <div>
              {formatMessage({
                id: getTrad(`CoreStore.info.backupNotice`),
              })}
            </div>
          </Padded>
        </div>

        <ExportCoreStoreButton
          fileName="settings-layout-backup-strapi"
          label="Download Back-up"
        />
      </Notice>

      <Padded top size="smd">
        <h3>Upload Settings file</h3>

        {formatMessage({
          id: getTrad(`CoreStore.file.import.description`),
        })}
      </Padded>

      <Padded top size="smd">
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
      </Padded>

      {fileForUploadName && (
        <Padded top size="smd">
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

export default ImportCoreStoreFile;

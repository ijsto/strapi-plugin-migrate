import React, { useState } from 'react';
import { Button } from '@buffetjs/core';

import { useGlobalContext, request } from 'strapi-helper-plugin';

// import Box from '../layout/Box';
import Row from '../layout/Row';
import getTrad from '../../utils/getTrad';
// import readJsonFromFile from '../../utils/readJsonFromFile';

const ImportCollections = () => {
  const { formatMessage } = useGlobalContext();
  const [fileForUpload, setFileForUpload] = useState(null);

  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleSubmit = async () => {
    setLoadingSubmit(true);

    try {
      strapi.lockApp();
      await request(`/migrate/uploadContentJSON`, {
        method: 'POST',
        body: {
          collectionTypes: fileForUpload,
        },
      });
      strapi.notification.success('Success');
    } catch (err) {
      strapi.notification.error(err.toString());
    }
    strapi.unlockApp();
  };

  return (
    <div>
      <h1>{formatMessage({ id: getTrad(`CollectionTypes.import.title`) })}</h1>

      <h3>Coming soon. 😏</h3>
      {/* <Box py="20px">
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
      </Box> */}
      <Row>
        <Button
          isLoading={loadingSubmit}
          disabled={!fileForUpload || loadingSubmit}
          label="Upload"
          onClick={handleSubmit}
        />
      </Row>
    </div>
  );
};

export default ImportCollections;

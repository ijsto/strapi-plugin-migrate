/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { request } from 'strapi-helper-plugin';
import { Button, Padded } from '@buffetjs/core';

import TextArea from '../data-entry/TextArea';
import Row from '../layout/Row';

const BackUpExporter = () => {
  const [retrievedBackUpString, setRetrievedBackUpString] = useState('');
  const [loadingRetrieve, setLoadingRetrieve] = useState(false);

  const [copySuccess, setCopySuccess] = useState(false);

  const handleRetrieveBackUp = async () => {
    setLoadingRetrieve(true);

    try {
      const response = await request('/migrate/user-permissions/backup', {
        body: { type: 'postgres' },
        method: 'POST',
      });

      if (response) {
        const cleanedString = response.generatedString.replace(/\\\//g, '/');

        setRetrievedBackUpString(`${cleanedString};`);
        setLoadingRetrieve(false);
      }
    } catch (e) {
      strapi.notification.error('Sorry, something went wrong.');
      setLoadingRetrieve(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(retrievedBackUpString);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  useEffect(() => {
    handleRetrieveBackUp();
  }, []);

  return (
    <div>
      <div>
        Copy the below text to a file in case something goes wrong, you will be
        able to restore your permissions with this.
      </div>

      <Padded top size="smd">
        <Row>
          {retrievedBackUpString && (
            <Button
              color={copySuccess ? 'success' : 'primary'}
              label={copySuccess ? 'Copied!' : 'Copy Data'}
              onClick={handleCopy}
            />
          )}
        </Row>

        {retrievedBackUpString && (
          <TextArea>{retrievedBackUpString}</TextArea>
        )}
      </Padded>
    </div>
  );
};

export default BackUpExporter;

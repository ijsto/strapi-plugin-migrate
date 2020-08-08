/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { request } from 'strapi-helper-plugin';
import { Button, Padded } from '@buffetjs/core';

import Row from './layout/Row';
import ResultsContainer from './UserPermissions/ResultsContainer';

const BackUpExporter = () => {
  const [retrievedBackUpString, setRetrievedBackUpString] = useState('');
  const [loadingRetrieve, setLoadingRetrieve] = useState(false);
  const [errorRetrieve, setErrorRetrieve] = useState(null);

  const [copySuccess, setCopySuccess] = useState(false);

  const handleRetrieveBackUp = async () => {
    setErrorRetrieve(false);
    setLoadingRetrieve(true);

    try {
      const response = await request('/migrate/backUpCurrentPermissions', {
        method: 'POST',
        body: { type: 'postgres' },
      });

      if (response) {
        const cleanedString = response.generatedString.replace(/\\\//g, '/');

        setRetrievedBackUpString(`${cleanedString};`);
        setLoadingRetrieve(false);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('Error: ', e);
      setErrorRetrieve(true);
      setLoadingRetrieve(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(retrievedBackUpString);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 1500);
  };

  return (
    <div>
      <div>
        Copy the below text to a file in case something goes wrong, you will be
        able to restore your permissions with this.
      </div>

      <Padded top size="smd">
        {errorRetrieve && (
          <Row>
            <div style={{ color: '#dc3545' }}>Uh-oh! Something went wrong.</div>
          </Row>
        )}

        <Row>
          <Button
            disabled={loadingRetrieve}
            isLoading={loadingRetrieve}
            onClick={handleRetrieveBackUp}
            label="Get Back up"
            style={{ marginRight: 10 }}
          />
          {retrievedBackUpString && (
            <Button
              color={copySuccess ? 'success' : 'primary'}
              label={copySuccess ? 'Copied!' : 'Copy Data'}
              onClick={handleCopy}
            />
          )}
        </Row>

        {retrievedBackUpString && (
          <ResultsContainer>{retrievedBackUpString}</ResultsContainer>
        )}
      </Padded>
    </div>
  );
};

export default BackUpExporter;

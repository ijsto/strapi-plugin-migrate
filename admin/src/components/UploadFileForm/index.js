/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { Button, Textarea } from '@buffetjs/core';
import { request } from 'strapi-helper-plugin';
import Row from '../Row';
import CurrentRoles from '../CurrentRoles';

const UploadFileForm = () => {
  const [postgresString, setPostgresString] = useState('');
  const [retrievedPostgresString, setRetrievedPostgresString] = useState('');
  const [currentRoles, setCurrentRoles] = useState();

  const [loadingRetrieve, setLoadingRetrieve] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const [errorRetrieve, setErrorRetrieve] = useState(null);
  const [errorSubmit, setErrorSubmit] = useState(null);

  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [copySuccess, setCopySuccess] = useState(false);

  const handleRetrieve = async () => {
    setErrorRetrieve(false);
    setLoadingRetrieve(true);

    try {
      const response = await request('/migrate/retrieveSqlString', {
        method: 'POST',
        body: { updatedRoles: currentRoles, type: 'postgres' },
      });

      if (response) {
        const cleanedString = response.generatedString.replace(/\\\//g, '/');

        setRetrievedPostgresString(`${cleanedString};`);
        setLoadingRetrieve(false);
        setPostgresString('');
      }
    } catch (e) {
      console.log('Error: ', e);
      setErrorRetrieve(true);
      setLoadingRetrieve(false);
    }
  };

  const handleSubmit = async () => {
    if (postgresString?.length < 10) return;

    setErrorSubmit(false);
    setLoadingSubmit(true);

    try {
      const response = await request('/migrate/uploadPostgres', {
        method: 'POST',
        body: { postgresString },
      });

      if (response.success) {
        setPostgresString('');
        setLoadingSubmit(false);
        setSubmitSuccess(true);
      }
    } catch (e) {
      console.log('Error: ', e);
      setErrorSubmit(true);
      setLoadingSubmit(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(retrievedPostgresString);
    setCopySuccess(true);
  };

  return (
    <div style={{ padding: '1.8rem 1.5rem' }}>
      <h1 style={{ marginTop: '3rem' }}>Export Permissions</h1>
      <div>
        You will get a raw SQL query that you will be able to paste in another
        environment (for example staging, production).
      </div>

      <Row>
        <CurrentRoles
          currentRoles={currentRoles}
          setCurrentRoles={setCurrentRoles}
        />
      </Row>

      <Row>
        <Button
          disabled={loadingRetrieve}
          isLoading={loadingRetrieve}
          label="Get now"
          onClick={handleRetrieve}
          style={{ marginRight: 10 }}
        />
        {retrievedPostgresString && (
          <Button
            color={copySuccess ? 'success' : 'primary'}
            label={copySuccess ? 'Copied!' : 'Copy Permissions query'}
            onClick={handleCopy}
          />
        )}
      </Row>

      <Row>
        <Textarea value={retrievedPostgresString} readOnly />
      </Row>

      {!errorRetrieve && retrievedPostgresString && !loadingRetrieve && (
        <Row>
          <div style={{ color: '#28a745' }}>User permissions retrieved.</div>
        </Row>
      )}
      {errorRetrieve && (
        <Row>
          <div style={{ color: '#dc3545' }}>Uh-oh! Something went wrong.</div>
        </Row>
      )}

      <hr />
      <h1>Import Permissions</h1>
      <div>Paste in the raw SQL query of your User Permissions table</div>

      <Row>
        <Textarea
          disabled={loadingSubmit}
          onChange={({ target: { value } }) => setPostgresString(value)}
          value={postgresString}
        />
      </Row>

      {!errorSubmit && submitSuccess && !loadingSubmit && (
        <Row>
          <div style={{ color: '#28a745' }}>User permissions imported!</div>
        </Row>
      )}
      {errorSubmit && (
        <Row>
          <div style={{ color: '#dc3545' }}>Uh-oh! Something went wrong.</div>
        </Row>
      )}

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

export default UploadFileForm;

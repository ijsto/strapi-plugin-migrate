/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { Button, Textarea } from '@buffetjs/core';
import { request } from 'strapi-helper-plugin';

import Row from '../layout/Row';

const ImportPermissions = () => {
  const [postgresString, setPostgresString] = useState('');

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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

  return (
    <div style={{ padding: '1.8rem 1.5rem' }}>
      <h1>Import Permissions</h1>
      <div>Paste in the raw SQL query of your User Permissions table</div>
      <Row>
        <Textarea
          name="import-sql-string"
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

export default ImportPermissions;

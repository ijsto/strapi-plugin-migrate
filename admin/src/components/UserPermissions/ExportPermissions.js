/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { Button } from '@buffetjs/core';
import { useGlobalContext, request } from 'strapi-helper-plugin';

import Row from '../layout/Row';
import BackUpModal from './BackUpModal';
import getTrad from '../../utils/getTrad';
import ResultsContainer from './ResultsContainer';

const ExportPermissions = ({ currentRoles, setCurrentRoles }) => {
  const { formatMessage } = useGlobalContext();
  const [retrievedPostgresString, setRetrievedPostgresString] = useState('');

  const [loadingRetrieve, setLoadingRetrieve] = useState(false);
  const [errorRetrieve, setErrorRetrieve] = useState(null);

  const [copySuccess, setCopySuccess] = useState(false);

  const [isModalOpen, setModalOpen] = useState(false);

  const handleRetrieve = async () => {
    setErrorRetrieve(false);
    setLoadingRetrieve(true);

    try {
      const response = await request('/migrate/retrieveSqlString', {
        method: 'POST',
        body: { type: 'postgres' },
      });

      if (response) {
        const cleanedString = response.generatedString.replace(/\\\//g, '/');

        setRetrievedPostgresString(`${cleanedString};`);
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
    navigator.clipboard.writeText(retrievedPostgresString);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 1500);
  };

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <div>
      <h1>{formatMessage({ id: getTrad(`UserPermissions.export.title`) })}</h1>
      <div>
      {formatMessage({ id: getTrad(`UserPermissions.export.description`) })}
        
      </div>
      <BackUpModal
        isOpen={isModalOpen}
        setOpen={setModalOpen}
        handleOpen={handleOpenModal}
        handleClose={handleCloseModal}
        currentRoles={currentRoles}
        setCurrentRoles={setCurrentRoles}
      />
      <Row>
        <Button
          disabled={loadingRetrieve}
          isLoading={loadingRetrieve}
          label="Export now"
          onClick={handleRetrieve}
          style={{ marginRight: 10 }}
        />
        {retrievedPostgresString && (
          <Button
            color={copySuccess ? 'success' : 'primary'}
            label={copySuccess ? 'Copied!' : 'Copy Data'}
            onClick={handleCopy}
          />
        )}
      </Row>

      {!errorRetrieve && retrievedPostgresString && !loadingRetrieve && (
        <Row>
          <div style={{ color: '#28a745' }}>
            Permissions exported. Copy the below text into your import module in
            your destination app.
          </div>
        </Row>
      )}
      {errorRetrieve && (
        <Row>
          <div style={{ color: '#dc3545' }}>Uh-oh! Something went wrong.</div>
        </Row>
      )}

      {retrievedPostgresString && (
        <ResultsContainer>{retrievedPostgresString}</ResultsContainer>
      )}
    </div>
  );
};

export default ExportPermissions;

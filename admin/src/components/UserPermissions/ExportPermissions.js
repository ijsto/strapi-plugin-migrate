/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '@buffetjs/core';
import { useGlobalContext, request } from 'strapi-helper-plugin';

import Row from '../layout/Row';
import EditRoleIdsModal from './EditRoleIdsModal';
import getTrad from '../../utils/getTrad';

const StyledResultContainer = styled.div`
  max-height: 300px;
  padding: 1rem;
  background: #fafafb;
  border: 1px solid lightgrey;
  border-radius: 0.25rem;
  margin-top: 1rem;
  overflow-y: auto;
`;

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
        body: { updatedRoles: currentRoles, type: 'postgres' },
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
  };

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <div>
      <h1>{formatMessage({ id: getTrad(`UserPermissions.export.title`) })}</h1>
      <div>
        You will get a raw SQL query that you will be able to paste in another
        environment (for example staging, production).
      </div>
      <EditRoleIdsModal
        isOpen={isModalOpen}
        setOpen={setModalOpen}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
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
            label={copySuccess ? 'Copied!' : 'Copy Permissions query'}
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
        <StyledResultContainer>{retrievedPostgresString}</StyledResultContainer>
      )}
    </div>
  );
};

export default ExportPermissions;

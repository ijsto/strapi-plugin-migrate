import styled from 'styled-components';
import React, { useState } from 'react';
import { Button } from '@buffetjs/core';
import { useGlobalContext, request } from 'strapi-helper-plugin';

import Row from '../layout/Row';
import FadedCard from '../data-display/FadedCard';
import getTrad from '../../utils/getTrad';
import ResultsContainer from './ResultsContainer';

const StyledFadedCardText = styled(FadedCard)`
  &:before {
    content: '\f036';
    color: #adadad;
  }
`;

const ExportPermissionsText = () => {
  const { formatMessage } = useGlobalContext();
  const [retrievedPostgresString, setRetrievedPostgresString] = useState('');

  const [loadingRetrieve, setLoadingRetrieve] = useState(false);
  const [errorRetrieve, setErrorRetrieve] = useState(null);

  const [copySuccess, setCopySuccess] = useState(false);

  const [isShowMoreOpen, setShowMoreOpen] = useState(false);

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

  const handleOpenShowMore = () => setShowMoreOpen(true);
  const handleCloseShowMore = () => setShowMoreOpen(false);

  return (
    <StyledFadedCardText>
      <h3>Export as text</h3>

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

      <div style={{ marginTop: 16 }}>
        <strong>
          {!isShowMoreOpen && <a onClick={handleOpenShowMore}>Show More</a>}
          {isShowMoreOpen && <a onClick={handleCloseShowMore}>Show Less</a>}
        </strong>
      </div>

      <div style={{ paddingTop: 16 }}>
        <p>
          You wil be able to copy-paste this from one environment to another.
        </p>
      </div>

      {isShowMoreOpen && (
        <div style={{ paddingTop: 16 }}>
          <p>
            This is less secure and may not be best suited for bigger projects, but can
            be convenient for a quick-and-dirty migrations.
          </p>
          <p>
            {formatMessage({
              id: getTrad(`UserPermissions.export.description`),
            })}
          </p>
        </div>
      )}
    </StyledFadedCardText>
  );
};

export default ExportPermissionsText;

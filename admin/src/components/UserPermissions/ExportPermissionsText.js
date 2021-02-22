import styled from 'styled-components';
import React, { useState } from 'react';
import { Button } from '@buffetjs/core';
import { useGlobalContext, request } from 'strapi-helper-plugin';

import Notice from '../feedback/Notice';
import Box from '../layout/Box';
import Row from '../layout/Row';
import CardWidget from '../data-display/CardWidget';

import getTrad from '../../utils/getTrad';
import ResultsContainer from './ResultsContainer';
import ShowMoreCollapse from '../data-display/ShowMoreCollapse';

const StyledCardWidgetText = styled(CardWidget)`
  &:before {
    content: '\f036';
    color: #d6d6d6;
  }
`;

const ExportPermissionsText = () => {
  const { formatMessage } = useGlobalContext();
  const [retrievedPostgresString, setRetrievedPostgresString] = useState('');

  const [loadingRetrieve, setLoadingRetrieve] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleRetrieve = async () => {
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
      strapi.notification.error('Sorry, something went wrong.');
      setLoadingRetrieve(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(retrievedPostgresString);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 1500);
  };

  return (
    <StyledCardWidgetText variant="accent">
      <h3>Export as text</h3>

      <Row>
        <Button
          disabled={loadingRetrieve}
          isLoading={loadingRetrieve}
          label="Export as text"
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
      {retrievedPostgresString && !loadingRetrieve && (
        <Row>
          <div style={{ color: '#28a745' }}>
            Permissions exported. Copy the below text into your import module in
            your destination app.
          </div>
        </Row>
      )}

      {retrievedPostgresString && (
        <ResultsContainer>{retrievedPostgresString}</ResultsContainer>
      )}

      <ShowMoreCollapse
        keepOnDisplay={
          <div style={{ paddingTop: 16 }}>
            <p>
              You wil be able to copy-paste this from one environment to
              another.
            </p>
          </div>
        }
      >
        <div style={{ paddingTop: 16 }}>
          <p>
            {formatMessage({
              id: getTrad(`UserPermissions.export.description`),
            })}
          </p>
        </div>
      </ShowMoreCollapse>

      <Box>
        <Notice>
          Note: Currently only supported for Postgres DB.
          <p>
            <strong>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/ijsto/strapi-plugin-migrate/issues/9"
              >
                Related issue on Github.
              </a>
            </strong>
          </p>
        </Notice>
      </Box>
    </StyledCardWidgetText>
  );
};

export default ExportPermissionsText;

import styled from 'styled-components';
import React, { useState } from 'react';
import { Button } from '@buffetjs/core';
import { useGlobalContext, request } from 'strapi-helper-plugin';

import CardWidget from '../data-display/CardWidget';
import ShowMoreCollapse from '../data-display/ShowMoreCollapse';
import TextArea from '../data-entry/TextArea';

import Notice from '../feedback/Notice';

import Box from '../layout/Box';
import Row from '../layout/Row';

import getTrad from '../../utils/getTrad';

export const StyledCardWidgetText = styled(CardWidget)`
  &:before {
    content: ${({ icon }) => (icon === 'copy' ? `'\f0c5'` : `'\f0ea'`)};
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
        strapi.notification.toggle({
          message:
            'Permissions exported. Paste into your destination Strapi app.',
          timeout: 3500,
          title: 'Woohoo! 🥳',
          type: 'success',
        });

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
    <StyledCardWidgetText variant="accent" icon="copy">
      <h3>Export as text</h3>

      <Row>
        <Button
          disabled={loadingRetrieve}
          isLoading={loadingRetrieve}
          label="Export as text"
          onClick={handleRetrieve}
          style={{ marginBottom: 4, marginRight: 10 }}
        />
        {retrievedPostgresString && (
          <Button
            color={copySuccess ? 'success' : 'primary'}
            label={copySuccess ? 'Copied!' : 'Copy Data'}
            onClick={handleCopy}
          />
        )}
      </Row>

      {retrievedPostgresString && (
        <TextArea block disabled value={retrievedPostgresString} />
      )}

      <Box my="20px">
        <ShowMoreCollapse openLabel="Info">
          <div>
            <p>
              You wil be able to copy-paste this from one environment to
              another.
            </p>
            <p>
              {formatMessage({
                id: getTrad(`UserPermissions.clipboard.export.description`),
              })}
            </p>
          </div>
        </ShowMoreCollapse>
      </Box>

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

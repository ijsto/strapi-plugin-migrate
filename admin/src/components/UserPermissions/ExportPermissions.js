/* eslint-disable import/no-extraneous-dependencies */
import styled from 'styled-components';
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { useGlobalContext, request } from 'strapi-helper-plugin';

import Flex from '../layout/Flex';
import Row from '../layout/Row';
import FadedCard from '../data-display/FadedCard';
import getTrad from '../../utils/getTrad';
import ExportPermissionsText from './ExportPermissionsText';
import ExportPermissionsFile from './ExportPermissionsFile';

const StyledFadedCardFile = styled(FadedCard)`
  &:before {
    content: '\f56d';
    color: #adadad;
  }
`;

const ExportPermissions = () => {
  const { formatMessage } = useGlobalContext();
  const [retrievedPostgresString, setRetrievedPostgresString] = useState('');

  const [loadingRetrieve, setLoadingRetrieve] = useState(false);
  const [errorRetrieve, setErrorRetrieve] = useState(null);

  const [copySuccess, setCopySuccess] = useState(false);

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

  return (
    <div>
      <h1>{formatMessage({ id: getTrad(`UserPermissions.export.title`) })}</h1>

      <Flex>
        <ExportPermissionsText />

        <ExportPermissionsFile />
      </Flex>
    </div>
  );
};

export default ExportPermissions;

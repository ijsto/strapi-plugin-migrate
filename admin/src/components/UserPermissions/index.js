/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { Button } from '@buffetjs/core';
import { useGlobalContext, HeaderNav, request } from 'strapi-helper-plugin';
// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
// eslint-disable-next-line import/no-extraneous-dependencies
import { camelCase } from 'lodash';

// eslint-disable-next-line import/no-extraneous-dependencies
import getTrad from '../../utils/getTrad';

import EditRoleIdsModal from './EditRoleIdsModal';
import pluginId from '../../pluginId';
import ImportExportTool from './ImportExportTool';
import LoadingIndicator from '../feedback/LoadingIndicator';

const StyledInfoHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 2rem;
  margin: 1rem 0;
  padding: 1rem 0;
  .info {
    border-radius: 0.25rem;
    background-color: var(--warning);
    padding: 2rem;
  }
`;

const UserPermissions = () => {
  const [currentRoles, setCurrentRoles] = useState();

  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const [loadingRetrieve, setLoadingRetrieve] = useState(false);
  const [errorRetrieve, setErrorRetrieve] = useState(null);

  const { formatMessage } = useGlobalContext();

  const handleRetrieveRoles = async () => {
    setErrorRetrieve(false);
    setLoadingRetrieve(true);

    try {
      const response = await request('/migrate/retrieveCurrentRoles', {
        method: 'GET',
      });

      if (response) {
        setCurrentRoles(response.currentRoles);
        setLoadingRetrieve(false);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('Error: ', e);
      setErrorRetrieve(true);
      setLoadingRetrieve(false);
    }
  };

  useEffect(() => {
    handleRetrieveRoles();
  }, []);

  const tabs = ['import', 'export'].map(tabName => {
    const name = tabName;
    const camelCaseName = camelCase(tabName);

    return {
      tabName,
      to: `/plugins/${pluginId}/user-permissions/${name}`,

      name: formatMessage({
        id: getTrad(`UserPermissions.HeaderNav.link.${camelCaseName}`),
      }),
    };
  });

  if (loadingRetrieve) return <LoadingIndicator />;
  if (errorRetrieve) return 'Failed loading roles...';

  return (
    <div style={{ padding: '1.8rem 1.5rem' }}>
      <StyledInfoHeader>
        <div className="info">
          <h4>Be sure to synchronize your user role IDs.</h4>
          <Button
            label="How?"
            color="success"
            onClick={() => alert('Tutorial is coming soon!')}
            style={{ marginRight: '1em' }}
          />
          <Button label="Synchronize now" onClick={handleOpenModal} />
        </div>
        <div>More info</div>
      </StyledInfoHeader>

      <HeaderNav links={tabs} style={{ marginTop: '1.6rem' }} />

      <Route
        path={`/plugins/${pluginId}/:settingType/:action`}
        render={props => <ImportExportTool {...props} />}
        exact
      />

      <EditRoleIdsModal
        isOpen={isModalOpen}
        setOpen={setModalOpen}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        currentRoles={currentRoles}
        setCurrentRoles={setCurrentRoles}
      />
    </div>
  );
};

export default UserPermissions;

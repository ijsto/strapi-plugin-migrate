/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { Button } from '@buffetjs/core';
import { request } from 'strapi-helper-plugin';

import EditRoleIdsModal from './EditRoleIdsModal';
import ImportPermissions from './ImportPermissions';
import ExportPermissions from './ExportPermissions';

const UserPermissions = () => {
  const [currentRoles, setCurrentRoles] = useState();

  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const [loadingRetrieve, setLoadingRetrieve] = useState(false);
  const [errorRetrieve, setErrorRetrieve] = useState(null);

  const handleRetrieveRoles = async () => {
    setErrorRetrieve(false);
    setLoadingRetrieve(true);

    try {
      const response = await request('/migrate/retrieveCurrentRoles', {
        method: 'GET',
      });
      console.log('handleRetrieveRoles -> response', response);

      if (response) {
        setCurrentRoles(response.currentRoles);
        setLoadingRetrieve(false);
      }
    } catch (e) {
      console.log('Error: ', e);
      setErrorRetrieve(true);
      setLoadingRetrieve(false);
    }
  };

  useEffect(() => {
    handleRetrieveRoles();
  }, []);

  if (loadingRetrieve) return 'Loading roles...';
  if (errorRetrieve) return 'Failed loading roles...';

  return (
    <div style={{ padding: '1.8rem 1.5rem' }}>
      <Button label="Edit User IDs" onClick={handleOpenModal} />

      <EditRoleIdsModal
        isOpen={isModalOpen}
        setOpen={setModalOpen}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        currentRoles={currentRoles}
        setCurrentRoles={setCurrentRoles}
      />
      <ExportPermissions
        currentRoles={currentRoles}
        setCurrentRoles={setCurrentRoles}
      />
      <hr />
      <ImportPermissions />
    </div>
  );
};

export default UserPermissions;

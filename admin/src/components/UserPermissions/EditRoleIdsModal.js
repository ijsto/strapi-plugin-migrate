// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Modal, ModalFooter, ModalHeader } from 'strapi-helper-plugin';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Button, Padded } from '@buffetjs/core';

import CurrentRoles from '../CurrentRoles';

const EditRoleIdsModal = ({
  currentRoles,
  setCurrentRoles,
  isOpen,
  setOpen,
  handleClose,
}) => {
  const handleToggle = () => {
    setOpen(!isOpen);
  };
  //   const handleSaveRoleIds = () => {
  //     console.log('Will save');
  //   };

  return (
    <Modal isOpen={isOpen} onToggle={handleToggle} onClosed={handleClose}>
      <ModalHeader headerBreadcrumbs={['Edit User-Permissions roles']} />

      <Padded top left right bottom size="30px">
        <CurrentRoles
          currentRoles={currentRoles}
          setCurrentRoles={setCurrentRoles}
        />
      </Padded>

      <ModalFooter>
        <section>
          <Button type="button" color="cancel" onClick={handleToggle}>
            Cancel
          </Button>

          <Button
            disabled={false}
            color="success"
            type="button"
            onClick={handleToggle}
          >
            Save Roles
          </Button>
        </section>
      </ModalFooter>
    </Modal>
  );
};

export default EditRoleIdsModal;

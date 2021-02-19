// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Modal, ModalFooter, ModalHeader } from 'strapi-helper-plugin';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Button, Padded } from '@buffetjs/core';

import BackUpExporter from './BackUpExporter';

const BackUpModal = ({ isOpen, setOpen, handleClose }) => {
  const handleToggle = () => {
    setOpen(!isOpen);
  };

  return (
    <Modal isOpen={isOpen} onToggle={handleToggle} onClosed={handleClose}>
      <ModalHeader headerBreadcrumbs={['Export User Permissions Back Up']} />

      <Padded top left right bottom size="30px">
        <BackUpExporter />
      </Padded>

      <ModalFooter>
        <section>
          <Button
            disabled={false}
            color="success"
            type="button"
            onClick={handleToggle}
          >
            Done
          </Button>
        </section>
      </ModalFooter>
    </Modal>
  );
};

export default BackUpModal;

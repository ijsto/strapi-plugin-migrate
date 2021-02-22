/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Button, Flex } from '@buffetjs/core';
import { useGlobalContext, HeaderNav } from 'strapi-helper-plugin';
import { camelCase } from 'lodash';

import SocialShare from '../common/SocialShare';
import Box from '../layout/Box';
import Spacer from '../layout/Spacer';
import Notice from '../feedback/Notice';

import basePluginUrl from '../../basePluginUrl';
import getTrad from '../../utils/getTrad';

import BackUpModal from './BackUpModal';
import MigrateTool from './MigrateTool';

const UserPermissions = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const { formatMessage } = useGlobalContext();

  const tabs = ['file', 'clipboard'].map(tabName => {
    const name = tabName;
    const camelCaseName = camelCase(tabName);

    return {
      name: formatMessage({
        id: getTrad(`UserPermissions.${camelCaseName}.tab.label`),
      }),
      tabName,
      to: `${basePluginUrl}/user-permissions/${name}`,
    };
  });

  const backupNotice = formatMessage({
    id: getTrad(`UserPermissions.info.backupNotice`),
  });

  return (
    <>
      <Route
        path={`${basePluginUrl}/user-permissions`}
        render={() => (
          <Redirect to={`${basePluginUrl}/user-permissions/file`} />
        )}
        exact
      />

      <Notice>
        <Flex justifyContent="space-between" alignItems="center">
          <div style={{ marginRight: 32 }}>
            <span
              style={{ display: 'block', fontSize: 54 }}
              role="img"
              aria-label="Rocket-launch"
            >
              🚀
            </span>
            <Button label="Back up now" onClick={handleOpenModal} />
          </div>

          <div style={{ flex: 2 }}>
            <h2>Back up</h2>
            <div>{backupNotice}</div>
          </div>
        </Flex>
      </Notice>

      <Spacer />

      <HeaderNav links={tabs} style={{ marginTop: '1.6rem' }} />
      <Route
        path={`${basePluginUrl}/:migrateType/:exportType`}
        render={props => <MigrateTool {...props} />}
        exact
      />

      <Box my="20px">
        <SocialShare />
      </Box>
      <BackUpModal
        isOpen={isModalOpen}
        setOpen={setModalOpen}
        handleOpen={handleOpenModal}
        handleClose={handleCloseModal}
      />
    </>
  );
};

export default UserPermissions;

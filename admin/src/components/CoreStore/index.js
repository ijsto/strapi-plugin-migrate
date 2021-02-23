import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Flex } from '@buffetjs/core';
import { useGlobalContext, HeaderNav } from 'strapi-helper-plugin';
import { camelCase } from 'lodash';

import SocialShare from '../common/SocialShare';
import Notice from '../feedback/Notice';

import Box from '../layout/Box';
import Spacer from '../layout/Spacer';

import basePluginUrl from '../../basePluginUrl';
import getTrad from '../../utils/getTrad';

import MigrateTool from './MigrateTool';
import { ExportCoreStoreButton } from './ExportCoreStoreFile';

const CoreStore = () => {
  const { formatMessage } = useGlobalContext();

  const tabs = ['file', 'clipboard'].map(tabName => {
    const name = tabName;
    const camelCaseName = camelCase(tabName);

    return {
      name: formatMessage({
        id: getTrad(`CoreStore.${camelCaseName}.tab.label`),
      }),
      tabName,
      to: `${basePluginUrl}/core-store/${name}`,
    };
  });

  return (
    <>
      <Route
        path={`${basePluginUrl}/core-store`}
        render={() => <Redirect to={`${basePluginUrl}/core-store/file`} />}
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
            <ExportCoreStoreButton
              fileName="settings-layout-backup-strapi"
              label="Download Back-up"
            />
          </div>

          <div style={{ flex: 2 }}>
            <h2>Back up</h2>
            <div>
              {formatMessage({
                id: getTrad(`CoreStore.info.backupNotice`),
              })}
            </div>
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
    </>
  );
};

export default CoreStore;

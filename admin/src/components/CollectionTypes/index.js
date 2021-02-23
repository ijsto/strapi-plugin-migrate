/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { camelCase } from 'lodash';
import { useGlobalContext, HeaderNav } from 'strapi-helper-plugin';
import { Route, Redirect } from 'react-router-dom';
import { Button, Flex } from '@buffetjs/core';

import getTrad from '../../utils/getTrad';
import basePluginUrl from '../../basePluginUrl';
import Spacer from '../layout/Spacer';
import Notice from '../feedback/Notice';

import ImportExportCollections from './ImportExportCollections';

const CollectionTypes = () => {
  const { formatMessage } = useGlobalContext();
  const tabs = ['file', 'clipboard'].map(tabName => {
    const name = tabName;
    const camelCaseName = camelCase(tabName);

    return {
      name: formatMessage({
        id: getTrad(`CollectionTypes.${camelCaseName}.tab.label`),
      }),
      tabName,
      to: `${basePluginUrl}/collection-types/${name}`,
    };
  });

  return (
    <div>
      <Route
        path={`${basePluginUrl}/collection-types`}
        render={() => (
          <Redirect to={`${basePluginUrl}/collection-types/file`} />
        )}
        exact
      />

      <Notice variant="alert">
        <Flex justifyContent="space-between" alignItems="center">
          <div style={{ marginRight: 32 }}>
            <span
              style={{ display: 'block', fontSize: 54, paddingLeft: '1.5rem' }}
              role="img"
              aria-label="Rocket-launch"
            >
              🐱
            </span>
            <Button
              color="delete"
              label="Contribute"
              onClick={() =>
                window.open(
                  'https://github.com/ijsto/strapi-plugin-migrate/issues/8',
                  '_blank'
                )
              }
            />
          </div>

          <div style={{ flex: 2 }}>
            <h2>
              <strong>UZMANĪBU!</strong>
            </h2>
            <div>
              <p>
                Collection Type migrations are currently not supported. There are a few considerations and challenges, so this may not be available for a while.
              </p>

              <p>
                That said (written), if you think you may be able to contribute to solve this, please{' '}
                <strong>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/ijsto/strapi-plugin-migrate/issues/6"
                  >
                    visit the issue tracking Github page or create a PR.
                  </a>
                </strong>
              </p>
            </div>
          </div>
        </Flex>
      </Notice>

      <Spacer />

      <HeaderNav links={tabs} style={{ marginTop: '1.6rem' }} />
      <Route
        path={`${basePluginUrl}/:migrateType/:exportType`}
        render={props => <ImportExportCollections {...props} />}
        exact
      />
    </div>
  );
};

export default CollectionTypes;

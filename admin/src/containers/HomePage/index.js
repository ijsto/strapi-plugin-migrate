/*
 *
 * HomePage
 *
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import React, { memo } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Padded } from '@buffetjs/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ViewContainer, useGlobalContext } from 'strapi-helper-plugin';

// import PropTypes from 'prop-types';
import UserPermissions from '../../components/UserPermissions';
import pluginId from '../../pluginId';
import Sidebar from '../Sidebar';
import getTrad from '../../utils/getTrad';

const HomePage = () => {
  const { formatMessage } = useGlobalContext();

  return (
    <ViewContainer className={pluginId}>
      <div className="container-fluid">
        <div className="row">
          <Sidebar />

          <div className="col-md-9">
            <Padded top left size="smd">
              <h1>
                {formatMessage({
                  id: getTrad(`HomePage.header.title`),
                })}
              </h1>
              Strapi Migrate Dashboard
            </Padded>
          </div>
        </div>
      </div>
    </ViewContainer>
  );
};

export default memo(HomePage);

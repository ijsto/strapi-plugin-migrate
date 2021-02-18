/*
 *
 * Collection Types Page
 *
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import React, { memo } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Padded } from '@buffetjs/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ViewContainer, useGlobalContext } from 'strapi-helper-plugin';

import CollectionTypes from '../../components/CollectionTypes';
import pluginId from '../../pluginId';
import Sidebar from '../Sidebar';
import getTrad from '../../utils/getTrad';

const CollectionTypesPage = () => {
  const { formatMessage } = useGlobalContext();

  return (
    <ViewContainer className={pluginId}>
      <div className="container-fluid">
        <div className="row">
          <Sidebar />

          <div className="col-md-9">
            <Padded top size="smd">
              <h1>
                {formatMessage({
                  id: getTrad(`CollectionTypes.header.title`),
                })}
              </h1>
              <CollectionTypes />
            </Padded>
          </div>
        </div>
      </div>
    </ViewContainer>
  );
};

export default memo(CollectionTypesPage);

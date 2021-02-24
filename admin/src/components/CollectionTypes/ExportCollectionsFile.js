import styled from 'styled-components';
import React, { useState } from 'react';
import { request } from 'strapi-helper-plugin';
import { Button } from '@buffetjs/core';

import CardWidget from '../data-display/CardWidget';
import Notice from '../feedback/Notice';
import Box from '../layout/Box';

import downloadNamedJson from '../../utils/downloadNamedJson';

const StyledCardWidgetFile = styled(CardWidget)`
  margin-left: 2.5rem;
  &:before {
    content: '\f56d';
    color: #d6d6d6;
  }
`;

const ExportPermissionsFile = () => {
  const [isShowMoreOpen, setShowMoreOpen] = useState(false);

  const handleOpenShowMore = () => setShowMoreOpen(true);
  const handleCloseShowMore = () => setShowMoreOpen(false);

  const handleDownload = async () => {
    const isConfirmed = confirm(
      'Are you sure want to proceed? This feature is currently a work-in-progress. You are proceeding at your own risk.'
    );

    if (!isConfirmed) return null;

    try {
      const collections = await request(`/migrate/getContentJSON`);
      const sanitizedCollections = collections.filter(collection => collection);

      const file = sanitizedCollections.reduce(
        (collectionTypes, collection) => {
          collectionTypes[Object.keys(collection)[0]] =
            collection[Object.keys(collection)[0]];
          return collectionTypes;
        },
        {}
      );
      downloadNamedJson(file, 'export-collection-types-strapi-migrate');
    } catch (err) {
      strapi.notification.error(err.toString());
    }
  };

  return (
    <StyledCardWidgetFile variant="accent">
      <h3>Download a file</h3>
      <p>File downloads are coming soon.</p>

      <Box my="20px">
        <strong style={{ cursor: 'pointer' }}>
          {!isShowMoreOpen && <a onClick={handleOpenShowMore}>Tell me More</a>}
          {isShowMoreOpen && <a onClick={handleCloseShowMore}>Hide</a>}
        </strong>
      </Box>

      <Box my="20px">
        {isShowMoreOpen && (
          <div>
            <p>
              Due to lack of time I have been, unfortunately, unable to solve
              this for a little while by now. If you think this is a useful
              feature and would be willing to contribute,{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/ijsto/strapi-plugin-migrate/issues/6"
              >
                please feel free to open a PR
              </a>{' '}
              any help with this would awesome!
            </p>
            <p>
              Cheers,
              <br />– Scott 🍻
            </p>
          </div>
        )}
      </Box>

      <Box my="20px">
        <Notice>
          Please note that you should (for now) <strong>not rely</strong> on the
          data about Collection Types below.
        </Notice>
      </Box>

      <Box my="20px" id="download">
        <Button color="primary" label="Export Data" onClick={handleDownload} />
      </Box>
    </StyledCardWidgetFile>
  );
};

export default ExportPermissionsFile;

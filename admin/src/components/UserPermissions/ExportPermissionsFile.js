import styled from 'styled-components';
import React, { useState } from 'react';
import { request } from 'strapi-helper-plugin';
import { Button } from '@buffetjs/core';

import Box from '../layout/Box';
import CardWidget from '../data-display/CardWidget';

import downloadNamedJson from '../../utils/downloadNamedJson';

const StyledCardWidgetFile = styled(CardWidget)`
  &:before {
    content: '\f56d';
    color: #d6d6d6;
  }
`;

const ExportPermissionsFile = () => {
  const [isShowMoreOpen, setShowMoreOpen] = useState(false);

  const handleOpenShowMore = () => setShowMoreOpen(true);
  const handleCloseShowMore = () => setShowMoreOpen(false);

  const handlePermissionsDownload = async () => {
    try {
      const userRoles = await request(`/migrate/getPermissionsJSON`);
      downloadNamedJson(userRoles, 'user-permissions-strapi-migrate');
      strapi.notification.toggle({
        message: 'User permissions exported successfully.',
        timeout: 3500,
        title: 'Woohoo! 🥳',
        type: 'success',
      });
    } catch (err) {
      strapi.notification.toggle({
        message: err.toString(),
        timeout: 3500,
        title: 'Holy guacamole!',
        type: 'warning',
      });
    }
  };

  return (
    <StyledCardWidgetFile variant="accent">
      <h3>Download a file</h3>
      <p>File downloads are coming soon.</p>

      <Box my="20px" id="download">
        <Button
          color="primary"
          label="Download "
          onClick={handlePermissionsDownload}
        />
      </Box>

      <strong>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/ijsto/strapi-plugin-migrate/issues/6"
        >
          Track the issue or create a PR here.
        </a>
      </strong>

      <div style={{ marginTop: 16 }}>
        <strong>
          {!isShowMoreOpen && <a onClick={handleOpenShowMore}>Show More</a>}
          {isShowMoreOpen && <a onClick={handleCloseShowMore}>Show Less</a>}
        </strong>
      </div>

      <div style={{ paddingTop: 16 }}>
        <p>
          File exports are convenient because the data can be saved in an
          external storage.
        </p>
      </div>

      {isShowMoreOpen && (
        <div style={{ paddingTop: 16 }}>
          <p>
            Currently, file exports are not supported, but if you are interested
            in taking on a challenge or simple would like to contribute,{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/ijsto/strapi-plugin-migrate/issues/6"
            >
              please feel free to open a PR
            </a>
            .
          </p>
        </div>
      )}
    </StyledCardWidgetFile>
  );
};

export default ExportPermissionsFile;

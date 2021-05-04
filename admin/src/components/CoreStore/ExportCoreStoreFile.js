import styled from 'styled-components';
import React, { useState } from 'react';
import { request } from 'strapi-helper-plugin';
import { Button } from '@buffetjs/core';

import CardWidget from '../data-display/CardWidget';
import ShowMoreCollapse from '../data-display/ShowMoreCollapse';

import downloadNamedJson from '../../utils/downloadNamedJson';

export const StyledCardWidgetFile = styled(CardWidget)`
  &:before {
    content: ${({ icon }) => (icon === 'upload' ? `'\f574'` : `'\f56d'`)};
    color: #d6d6d6;
  }
`;

export const ExportCoreStoreButton = ({ fileName, label }) => {
  const handleExport = async () => {
    try {
      const userRoles = await request(`/migrate/core-store/json/export`);
      downloadNamedJson(userRoles, fileName || 'settings-layouts-strapi-migrate');
      strapi.notification.toggle({
        message: 'Settings and layouts exported successfully.',
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
    <div id="download">
      <Button
        color="primary"
        label={label || 'Download'}
        onClick={handleExport}
      />
    </div>
  );
};

const ExportCoreStoreFile = () => {
  return (
    <StyledCardWidgetFile variant="accent" alignSelf="flex-start">
      <h3>Download an Export file</h3>
      <p>
        Clicking the button will download a JSON file with your Strapi Settings and layouts data.
      </p>

      <ExportCoreStoreButton />

      <ShowMoreCollapse openLabel="Details">
        <div style={{ paddingTop: 16 }}>
          <p>
            Exports JSON file that you can save on your computer or external
            storage.
          </p>
        </div>
      </ShowMoreCollapse>
    </StyledCardWidgetFile>
  );
};

export default ExportCoreStoreFile;

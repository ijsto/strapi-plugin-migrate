import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { request } from 'strapi-helper-plugin';
import { Button, Padded } from '@buffetjs/core';

import CardWidget from '../data-display/CardWidget';
import ShowMoreCollapse from '../data-display/ShowMoreCollapse';

import downloadNamedJson from '../../utils/downloadNamedJson';

export const StyledCardWidgetFile = styled(CardWidget)`
  &:before {
    content: ${({ icon }) => (icon === 'upload' ? `'\f574'` : `'\f56d'`)};
    color: #d6d6d6;
  }
`;

export const ExportCoreStoreButton = ({ fileName, label, showOptions }) => {
  const [models, setModels] = useState();
  const [selectedModel, setSelectedModel] = useState('');

  useEffect(() => {
    async function fetchData() {
      const { data } = await request('/content-type-builder/content-types');
      setModels(
        data
          .map((model) => ({
            value: model.uid,
            name: model.schema.name,
          }))
          .sort((a, b) => a.name.localeCompare(b.name))
      );
    }

    if (showOptions) fetchData();
  }, [models && models.length]);

  const handleExport = async (model) => {
    try {
      const path = model
        ? `/migrate/getCoreStoreJSON/${model}`
        : '/migrate/getCoreStoreJSON';
      const data = await request(path);

      const defaultFilename = model
        ? `settings-layouts-strapi-migrate-${model}`
        : 'settings-layouts-strapi-migrate';
      downloadNamedJson(data, fileName || defaultFilename);

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

  const handleChange = (e) => {
    setSelectedModel(e.currentTarget.value);
  };

  return (
    <div id="download">
      {showOptions && (
        <Padded top size="smd">
          <select onChange={handleChange} disabled={!models}>
            <option value="">All models</option>
            {models && models.map(({ name, value }) => (
              <option key={value} value={value}>{name}</option>
            ))}
          </select>
        </Padded>
      )}
      <Padded top size="smd">
        <Button
          color="primary"
          disabled={showOptions && !models}
          label={label || 'Download'}
          onClick={() => handleExport(selectedModel)}
        />
      </Padded>
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

      <ExportCoreStoreButton showOptions={true} />

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
import styled from 'styled-components';
import React, { useState } from 'react';
import { useGlobalContext } from 'strapi-helper-plugin';

import FadedCard from '../data-display/FadedCard';
import getTrad from '../../utils/getTrad';

const StyledFadedCardFile = styled(FadedCard)`
  &:before {
    content: '\f56d';
    color: #adadad;
  }
`;

const ExportPermissionsFile = () => {
  const { formatMessage } = useGlobalContext();
  const [isShowMoreOpen, setShowMoreOpen] = useState(false);

  const handleOpenShowMore = () => setShowMoreOpen(true);
  const handleCloseShowMore = () => setShowMoreOpen(false);

  return (
    <StyledFadedCardFile>
      <h3>Download a file</h3>
      <p>File downloads are coming soon.</p>

      <strong>
        <a href="https://github.com/ijsto/strapi-plugin-migrate/issues/6">
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
            in taking on a challenge or simple would like to contribute, <a href="https://github.com/ijsto/strapi-plugin-migrate/issues/6">please
            feel free to open a PR</a>.
          </p>
        </div>
      )}
    </StyledFadedCardFile>
  );
};

export default ExportPermissionsFile;

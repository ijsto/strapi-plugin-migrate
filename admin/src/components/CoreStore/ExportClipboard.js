import React from 'react';
import { useGlobalContext } from 'strapi-helper-plugin';

import Box from '../layout/Box';

import getTrad from '../../utils/getTrad';

const ExportClipboard = () => {
  const { formatMessage } = useGlobalContext();

  return (
    <Box>
      <h1>
        {formatMessage({
          id: getTrad(`UserPermissions.clipboard.export.title`),
        })}
      </h1>
      <p>
        {formatMessage({
          id: getTrad(`UserPermissions.clipboard.export.description`),
        })}
      </p>

      <Box margin="30px 0 0 0">
        <p>Currently unsupported. Want this feature?</p>

        <p>
          <strong>
            <a
              href="https://github.com/ijsto/strapi-plugin-migrate/issues/10"
              target="_blank"
              rel="noopener noreferrer"
            >
              Add your thoughts to this discussion.
            </a>
          </strong>
        </p>
      </Box>
    </Box>
  );
};

export default ExportClipboard;

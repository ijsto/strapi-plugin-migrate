import React, { useState } from 'react';
import { Button, Textarea } from '@buffetjs/core';
import { useGlobalContext, request } from 'strapi-helper-plugin';

import Box from '../layout/Box';
import Row from '../layout/Row';

import getTrad from '../../utils/getTrad';
import { StyledCardWidgetText } from './ExportPermissionsText';

const ImportPermissionsText = () => {
  const { formatMessage } = useGlobalContext();
  const [postgresString, setPostgresString] = useState('');
  const [pasteSuccess, setPasteSuccess] = useState(false);

  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleSubmit = async pastedString => {
    if ((pastedString && pastedString?.length < 10) || (!pastedString && postgresString?.length < 10))
      return strapi.notification.toggle({
        message:
          "Your import text doesn't look quite right. Please try exporting it again.",
        timeout: 3500,
        title: 'Whoopsies!',
        type: 'warning',
      });

    setLoadingSubmit(true);

    try {
      const response = await request('/migrate/uploadPostgres', {
        method: 'POST',
        body: { postgresString: pastedString || postgresString },
      });

      if (response.success) {
        strapi.notification.toggle({
          link: {
            label: 'Go to Roles',
            url: '/admin/settings/users-permissions/roles',
          },
          message: 'User permissions exported successfully.',
          timeout: 3500,
          title: 'Woohoo! 🥳',
          type: 'success',
        });
        setPostgresString('');
        setLoadingSubmit(false);
      }
    } catch (err) {
      strapi.notification.toggle({
        message: err.toString(),
        timeout: 3500,
        title: 'Holy guacamole!',
        type: 'warning',
      });
      setLoadingSubmit(false);
    }
  };

  const handlePasteImport = () => {
    navigator.clipboard.readText().then(text => handleSubmit(text));
    setPasteSuccess(true);
    setTimeout(() => {
      setPasteSuccess(false);
    }, 3500);
  };

  return (
    <StyledCardWidgetText variant="accent">
      <Button
        color={pasteSuccess ? 'success' : 'primary'}
        label={pasteSuccess ? 'Permissions imported!' : 'Import from Clipboard'}
        isLoading={loadingSubmit}
        disabled={loadingSubmit}
        onClick={handlePasteImport}
      />

      <Box>
        {formatMessage({ id: getTrad(`UserPermissions.import.description`) })}
      </Box>

      <Row>
        <Textarea
          disabled={loadingSubmit}
          name="import-sql-string"
          onChange={({ target: { value } }) => setPostgresString(value)}
          value={postgresString}
        />
      </Row>

      <Row>
        <Button
          isLoading={loadingSubmit}
          disabled={loadingSubmit}
          label="Upload"
          onClick={handleSubmit}
        />
      </Row>
    </StyledCardWidgetText>
  );
};

export default ImportPermissionsText;

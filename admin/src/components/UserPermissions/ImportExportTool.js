/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';

import ImportPermissions from './ImportPermissions';
import ExportPermissions from './ExportPermissions';
import pluginId from '../../pluginId';

const StyledContainer = styled.div`
  border-radius: 0 0 0.2rem 0.2rem;
  background-color: #ffffff;
  box-shadow: 0 0.2rem 0.4rem 0 #e3e9f3;
  padding: 1.8rem 1.5rem;
`;

const ImportExportTool = () => {
  const [currentRoles, setCurrentRoles] = useState();
  return (
    <StyledContainer>
      <Route
        path={`/plugins/${pluginId}/:settingType/import`}
        render={props => <ImportPermissions {...props} />}
        exact
      />
      <Route
        path={`/plugins/${pluginId}/:settingType/export`}
        render={props => (
          <ExportPermissions
            {...props}
            currentRoles={currentRoles}
            setCurrentRoles={setCurrentRoles}
          />
        )}
        exact
      />
    </StyledContainer>
  );
};

export default ImportExportTool;

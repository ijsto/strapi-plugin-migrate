import React from 'react';
import styled from 'styled-components';

import ImportPermissions from './ImportPermissions';
import ExportPermissions from './ExportPermissions';

const StyledContainer = styled.div`
  border-radius: 0 0 0.2rem 0.2rem;
  background-color: #ffffff;
  box-shadow: 0 0.2rem 0.4rem 0 #e3e9f3;
  padding: 1.8rem 1.5rem;
`;

const ImportExportTool = ({
  match: {
    params: { action },
  },
}) => {
  return (
    <StyledContainer>
      {action === 'export' ? (
        <ExportPermissions />
      ) : (
        <ImportPermissions />
      )}
    </StyledContainer>
  );
};

export default ImportExportTool;

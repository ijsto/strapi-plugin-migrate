import React from 'react';
import styled from 'styled-components';

import ExportFile from './ExportFile';
import ExportClipboard from './ExportClipboard';

const StyledContainer = styled.div`
  border-radius: 0 0 0.2rem 0.2rem;
  background-color: #ffffff;
  box-shadow: 0 0.2rem 0.4rem 0 #e3e9f3;
  padding: 1.8rem 1.5rem;
`;

const MigrateTool = ({
  match: {
    params: { exportType },
  },
}) => {
  return (
    <StyledContainer>
      {exportType === 'file' ? (
        <ExportFile />
      ) : (
        <ExportClipboard /> 
      )}
    </StyledContainer>
  );
};

export default MigrateTool;

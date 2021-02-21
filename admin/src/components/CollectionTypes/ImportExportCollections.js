import React, { useState } from 'react';
import styled from 'styled-components';

import ImportCollections from './ImportCollections';
import ExportCollections from './ExportCollections';

const StyledContainer = styled.div`
  border-radius: 0 0 0.2rem 0.2rem;
  background-color: #ffffff;
  box-shadow: 0 0.2rem 0.4rem 0 #e3e9f3;
  padding: 1.8rem 1.5rem;
`;

const ImportExportCollections = ({
  match: {
    params: { action },
  },
}) => {
  const [currentRoles, setCurrentRoles] = useState();

  return (
    <StyledContainer>
      {action === 'export' ? (
        <ExportCollections
          currentRoles={currentRoles}
          setCurrentRoles={setCurrentRoles}
        />
      ) : (
        <ImportCollections />
      )}
    </StyledContainer>
  );
};

export default ImportExportCollections;

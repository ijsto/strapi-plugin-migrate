import styled from 'styled-components';
import React from 'react';

import CardWidget from '../data-display/CardWidget';

const StyledCardWidgetText = styled(CardWidget)`
  &:before {
    content: '\f036';
    color: #adadad;
  }
`;

const ExportCollectionsText = () => {
  return (
    <StyledCardWidgetText variant="accent">
      <h3>Export as text</h3>
      
      <p>Coming soon.</p>
    </StyledCardWidgetText>
  );
};

export default ExportCollectionsText;

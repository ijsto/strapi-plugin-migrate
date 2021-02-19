import React from 'react';
import styled from 'styled-components';

const StyledSpacer = styled.div`
  height: ${({height}) => height || '2rem'};
`;

const Spacer = props => {
  return <StyledSpacer {...props} />;
};

export default Spacer;

import React from 'react';
import styled from 'styled-components';

const StyledFlex = styled.div`
  display: flex;
  justify-content: ${({ justify }) => justify || 'space-between'};
  padding: ${({ padding}) => padding || "8px"};
`;

const Flex = ({ children, ...rest }) => {
  return <StyledFlex {...rest}>{children}</StyledFlex>;
};

export default Flex;

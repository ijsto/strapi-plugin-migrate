import React from 'react';
import styled from 'styled-components';

const StyledCardWidget = styled.div`
  align-self: ${({ alignSelf }) => alignSelf};
  background-color: ${({variant}) => variant === "accent" ? "#f7f8f8" : "white"};
  height: auto;
  line-height: 18px;
  padding: 21px 30px;
  padding-left: 40px;
  position: relative;
  
  &:before {
    position: absolute;
    left: -4px;
    top: 24px;
    font-family: 'FontAwesome';
    font-size: 38px;
  }
`;

const CardWidget = ({ children, ...rest }) => {
  return <StyledCardWidget {...rest}>{children}</StyledCardWidget>;
};

export default CardWidget;

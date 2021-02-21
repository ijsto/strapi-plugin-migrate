import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  align-self: ${({ alignSelf }) => alignSelf || "baseline"};
  background-color: white;
  border-radius: 2px;
  box-shadow: 0 2px 4px #e3e9f3;
  height: auto;
  line-height: 18px;
  padding: ${({ padded, padding }) => (padded ? '20px 10px' : padding || 0)};
  position: relative;
`;

const Card = ({ children, ...rest }) => {
  return <StyledCard {...rest}>{children}</StyledCard>;
};

export default Card;

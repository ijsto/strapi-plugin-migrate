import React from 'react';
import styled from 'styled-components';

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: ${({ templateColumns }) =>
    templateColumns || '1fr 1fr'};
  grid-gap: ${({ gap }) => gap || '2.5rem'};
`;

const Grid = ({ children, ...props }) => {
  return <StyledGrid {...props}>{children}</StyledGrid>;
};

export default Grid;

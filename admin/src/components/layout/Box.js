import React from 'react';
import styled from 'styled-components';

const StyledBox = styled.div`
  padding: ${({ p, px, py, padding }) =>
    px || py ? `${py || 0} ${px || 0}` : p || padding};
  margin: ${({ m, mx, my, margin }) =>
    mx || my ? `${my || 0} ${mx || 0}` : m || margin};
`;

const Box = ({ children, ...rest }) => {
  return <StyledBox {...rest}>{children}</StyledBox>;
};

export default Box;

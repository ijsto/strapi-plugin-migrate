import React from 'react';
import styled from 'styled-components';

const StyledNotice = styled.div`
  background: rgba(
    ${({ variant }) => (variant === 'alert' ? '255,0,0' : '0, 123, 255')},
    0.125
  );
  border: 2px dashed
    var(${({ variant }) => (variant === 'alert' ? '--red' : '--blue')});
  border-radius: 0.25rem;
  padding: 2.5rem;
`;

const Notice = ({ children, ...rest }) => {
  return <StyledNotice {...rest}>{children}</StyledNotice>;
};

export default Notice;

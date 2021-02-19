import React from 'react';
import styled from 'styled-components';

const StyledNotice = styled.div`
  background: rgba(0, 123, 255, 0.125);
  border: 2px dashed var(--blue);
  border-radius: 0.25rem;
  /* justify-content: space-between; */
  padding: 2.5rem;
  /* .body {
    flex: 2;
  }
  .cta {
    flex: 1;
    text-align: right;
    span {
      display: block;
      font-size: 4em;
      margin-right: 0.75em;
    }
  } */
`;

const Notice = ({ children, ...rest }) => {
  return <StyledNotice {...rest}>{children}</StyledNotice>;
};

export default Notice;

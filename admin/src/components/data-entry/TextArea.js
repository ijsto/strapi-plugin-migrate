import React from 'react';
import styled from 'styled-components';

export const StyledResultContainer = styled.textarea`
  background: #fff;
  border: 1px solid lightgrey;
  border-radius: 0.25rem;
  margin-top: 1rem;
  max-height: 80px;
  opacity: ${({ opacity }) => opacity || 0.5};
  overflow: hidden;
  overflow-y: auto;
  padding: 1rem;
  width: ${({ block }) => (block ? '100%' : 'auto')};
`;

const TextArea = ({ children, ...rest }) => (
  <StyledResultContainer {...rest}>{children}</StyledResultContainer>
);

export default TextArea;

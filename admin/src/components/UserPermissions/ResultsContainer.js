// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';

export const StyledResultContainer = styled.div`
  max-height: 200px;
  padding: 1rem;
  background: #fafafb;
  border: 1px solid lightgrey;
  border-radius: 0.25rem;
  margin-top: 1rem;
  overflow-y: auto;
`;

const ResultsContainer = ({ children }) => {
  return <StyledResultContainer>{children}</StyledResultContainer>;
};

export default ResultsContainer;

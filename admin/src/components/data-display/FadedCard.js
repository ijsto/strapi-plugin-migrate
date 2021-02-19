import React from 'react';
import styled from 'styled-components';

const StyledFadedCard = styled.div`
  background-color: #f7f8f8;
  height: auto;
  line-height: 18px;
  padding: 21px 30px;
  padding-left: 40px;
  position: relative;
  width: calc(50% - 6px);
  &:before {
    position: absolute;
    left: -4px;
    top: 24px;
    font-family: 'FontAwesome';
    font-size: 38px;
  }
`;

const FadedCard = ({ children, ...rest }) => {
  return <StyledFadedCard {...rest}>{children}</StyledFadedCard>;
};

export default FadedCard;

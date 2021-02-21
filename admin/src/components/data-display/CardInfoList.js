import React from 'react';
import styled from 'styled-components';
import { Text } from '@buffetjs/core';

const StyledCardInfoListItemContainer = styled.div`
  color: #292b2c;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.5;
  padding-top: 2px;
`;
const StyledCardInfoListItem = styled.div`
  align-items: normal;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
`;

export const CardInfoListItem = ({ label, value }) => {
  return (
    <StyledCardInfoListItemContainer>
      <StyledCardInfoListItem>
        <Text
          fontSize="xs"
          color="grey"
          fontWeight="semiBold"
          className="sc-fzomME dEBJnC"
        >
          {label}
        </Text>
        <p
          color="greyDark"
          fontSize="md"
          fontWeight="regular"
          className="sc-fzomME cxGZTz"
        >
          {value}
        </p>
      </StyledCardInfoListItem>
    </StyledCardInfoListItemContainer>
  );
};

const CardInfoList = ({ list, ...rest }) => {
  return !Array.isArray(list)
    ? null
    : list.map((item, i) => (
        <StyledCardInfoListItemContainer key={`cli-${i}`} {...rest}>
          <CardInfoListItem label={item.label} value={item.value} />
        </StyledCardInfoListItemContainer>
      ));
};

export default CardInfoList;

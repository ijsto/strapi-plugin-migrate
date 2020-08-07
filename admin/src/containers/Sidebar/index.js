// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useGlobalContext } from 'strapi-helper-plugin';
// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';

import getTrad from '../../utils/getTrad';

const StyledSidebar = styled.div`
  background-color: #f2f3f4;
  padding-top: 3.1rem;
  padding-left: 2rem;
  padding-right: 2rem;
  min-height: calc(100vh - 6rem);
`;

const StyledLink = styled.div`
  padding: 1.5rem 0 0.5rem;
  border-bottom: 0.2rem solid #1c5de7;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    border-bottom: 0.2rem solid #17a2b8;
  }
`;

const Sidebar = () => {
  const { formatMessage } = useGlobalContext();
  return (
    <StyledSidebar className="col-md-3">
      <h2>Migrate</h2>

      <StyledLink>
        {formatMessage({ id: getTrad(`Sidebar.link.userPermissions`) })}
      </StyledLink>
      <StyledLink>
        {formatMessage({ id: getTrad(`Sidebar.link.content`) })}
      </StyledLink>
    </StyledSidebar>
  );
};

export default Sidebar;

// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useGlobalContext } from 'strapi-helper-plugin';
// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useParams } from 'react-router-dom';

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
  cursor: pointer;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  &:hover {
    color: var(--blue);
    font-weight: bold;
  }
`;

const Sidebar = () => {
  const { formatMessage } = useGlobalContext();
  const { migrateType } = useParams();

  return (
    <StyledSidebar className="col-md-3">
      <h2>Strapi Migrate</h2>

      <StyledLink active={migrateType === 'user-permissions'}>
        {formatMessage({ id: getTrad(`Sidebar.link.userPermissions`) })}
      </StyledLink>
      <StyledLink>
        {formatMessage({ id: getTrad(`Sidebar.link.content`) })} (coming soon)
      </StyledLink>
    </StyledSidebar>
  );
};

export default Sidebar;

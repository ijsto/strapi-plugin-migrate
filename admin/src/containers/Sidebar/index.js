// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useGlobalContext } from 'strapi-helper-plugin';
// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Link } from 'react-router-dom';

import basePluginUrl from '../../basePluginUrl';
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

  return (
    <StyledSidebar className="col-md-3">
      <Link to={basePluginUrl}>
        <StyledLink>
          {formatMessage({ id: getTrad(`Sidebar.link.dashboard`) })}
        </StyledLink>
      </Link>

      <Link to={`${basePluginUrl}/user-permissions`}>
        <StyledLink>
          {formatMessage({ id: getTrad(`Sidebar.link.userPermissions`) })}
        </StyledLink>
      </Link>

      <Link to={`${basePluginUrl}/collection-types`}>
        <StyledLink>
          {formatMessage({ id: getTrad(`Sidebar.link.collectionTypes`) })}
        </StyledLink>
      </Link>
      
      <div style={{ marginTop: 32}}>
        <h4>
          Contribute 🚀
        </h4>
      </div>
    </StyledSidebar>
  );
};

export default Sidebar;

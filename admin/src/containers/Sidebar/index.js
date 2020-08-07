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

const Sidebar = () => {
  const { formatMessage } = useGlobalContext();
  return (
    <StyledSidebar className="col-md-3">
      <h2>Migrate</h2>

      <div>
        {formatMessage({ id: getTrad(`Sidebar.link.userPermissions`) })}
      </div>
      <div>{formatMessage({ id: getTrad(`Sidebar.link.content`) })}</div>
    </StyledSidebar>
  );
};

export default Sidebar;

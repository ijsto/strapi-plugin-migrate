/*
 *
 * Default PageContainer
 * Use this to wrap any pages of the Strapi Migrate that 
 * do not require custom layout (currently - most, if not all cases).
 *
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Header } from '@buffetjs/custom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ViewContainer } from 'strapi-helper-plugin';

// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';

const Wrapper = styled(ViewContainer)`
  .button-secondary {
    &:hover {
      background-color: #ffffff !important;
      box-shadow: 0 0 0 #fff;
    }
  }
  .button-submit {
    min-width: 140px;
  }
`;

const PageContainer = ({ children, headerProps }) => {
  return (
    <Wrapper className={pluginId}>
      <Header {...headerProps} />

      <div>{children}</div>
    </Wrapper>
  );
};

export default PageContainer;

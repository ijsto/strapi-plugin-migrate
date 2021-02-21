import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from 'strapi-helper-plugin';
import { Button } from '@buffetjs/core';

import getTrad from '../../utils/getTrad';

const StyledInfoHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 2rem;
  margin: 1rem 0;
  padding: 1rem 0;
  .info {
    border-radius: 0.25rem;
    background-color: var(--blue);
    color: var(--white);
    padding: 2rem;
  }
`;

const SocialShare = () => {
  const { formatMessage } = useGlobalContext();
  const encodedTwitterMessage = encodeURI(
    formatMessage({ id: getTrad(`Social.share.twitter.text`) })
  );
  const twitterShareLink = `https://twitter.com/intent/tweet?text=${encodedTwitterMessage}`;

  return (
    <StyledInfoHeader>
      <div className="info">
        <h3>Saved some time?</h3>
        <div>If this plugin helped you save some time and hassle.</div>

        <Button
          color="success"
          label="Share it with others!"
          onClick={() => window.open(twitterShareLink, '_blank')}
        />
      </div>
      <div />
    </StyledInfoHeader>
  );
};

export default SocialShare;

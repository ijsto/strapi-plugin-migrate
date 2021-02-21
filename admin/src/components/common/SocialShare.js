import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from 'strapi-helper-plugin';
import { Button } from '@buffetjs/core';

import Box from '../../components/layout/Box';
import getTrad from '../../utils/getTrad';

const StyledSocialShare = styled.div`
  border-radius: 0.25rem;
  background-color: var(--blue);
  color: var(--white);
  padding: 2rem;
`;

const SocialShare = () => {
  const { formatMessage } = useGlobalContext();
  const encodedTwitterMessage = encodeURI(
    formatMessage({ id: getTrad(`Social.share.twitter.text`) })
  );
  const twitterShareLink = `https://twitter.com/intent/tweet?text=${encodedTwitterMessage}`;

  return (
    <StyledSocialShare>
      <Box margin="0 0 20px">
        <h3>Saved some time?</h3>
        <div>If this plugin helped you save some time and hassle.</div>
      </Box>

      <Box margin="20px 0 0">
        <Button
          color="success"
          label="Share it with others!"
          onClick={() => window.open(twitterShareLink, '_blank')}
        />
      </Box>
    </StyledSocialShare>
  );
};

export default SocialShare;

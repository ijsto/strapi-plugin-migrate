import React, { useState } from 'react';
import styled from 'styled-components';

import Box from '../layout/Box';
import Card from '../data-display/Card';
import CardInfoList from '../data-display/CardInfoList';

const StyledCardText = styled(Card)``;

const CollectionTypeStats = () => {
  const [isShowMoreOpen, setShowMoreOpen] = useState(false);
  const handleOpenShowMore = () => setShowMoreOpen(true);
  const handleCloseShowMore = () => setShowMoreOpen(false);

  const infoList = [
    { label: 'Collection Types', value: '??' },
    { label: 'Single Types', value: '??' },
  ];

  return (
    <StyledCardText padding="0 20px">
      <h3 style={{ marginTop: 16 }}>Collection Types</h3>

      <Box my="20px">
        <CardInfoList list={infoList} />
      </Box>

      <h4>Hey there! 👋🏼</h4>
      <p>File migrations are coming (hopefully) really soon.</p>

      <strong>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/ijsto/strapi-plugin-migrate/issues/6"
        >
          Track the issue or create a PR here.
        </a>
      </strong>

      <Box py="20px">
        <p>
          File exports are convenient because the data can be saved in an
          external storage.
        </p>

        <Box my="16px">
          <strong style={{ cursor: 'pointer' }}>
            {!isShowMoreOpen && <a onClick={handleOpenShowMore}>Show More</a>}
            {isShowMoreOpen && <a onClick={handleCloseShowMore}>Show Less</a>}
          </strong>
        </Box>

        {isShowMoreOpen && (
          <div>
            <p>
              Due to lack of time I am, unfortunately, I have been unable to get
              to this for a little while by now. If you think this is a useful
              feature and would be willing to contribute,{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/ijsto/strapi-plugin-migrate/issues/6"
              >
                please feel free to open a PR
              </a>{' '}
              any help with this would awesome!
            </p>
            <p>
              Cheers,
              <br />– Scott 🍻
            </p>
          </div>
        )}
      </Box>
    </StyledCardText>
  );
};

export default CollectionTypeStats;

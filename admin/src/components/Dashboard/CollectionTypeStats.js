import React, { useEffect, useState } from 'react';
import { request } from 'strapi-helper-plugin';
import { LoadingIndicator } from '@buffetjs/styles';

import styled from 'styled-components';

import Box from '../layout/Box';
import Card from '../data-display/Card';
import CardInfoList from '../data-display/CardInfoList';
import Notice from '../feedback/Notice';

const StyledCardText = styled(Card)``;

const CollectionTypeStats = () => {
  const [collectionTypes, setCollectionTypes] = useState(false);
  const [loadingRetrieve, setLoadingRetrieve] = useState(false);
  const [isShowMoreOpen, setShowMoreOpen] = useState(false);
  const handleOpenShowMore = () => setShowMoreOpen(true);
  const handleCloseShowMore = () => setShowMoreOpen(false);

  const infoList = [
    {
      label: 'Collection Types',
      value: !Array.isArray(collectionTypes)
        ? 0
        : collectionTypes.filter(ct => ct.kind === 'collectionType').length,
    },
    {
      label: 'Single Types',
      value: !Array.isArray(collectionTypes)
        ? 0
        : collectionTypes.filter(ct => ct.kind === 'singleType').length,
    },
    {
      label: 'Other',
      value: !Array.isArray(collectionTypes)
        ? 0
        : collectionTypes.filter(
            ct =>
              !ct.kind ||
              (ct.kind !== 'collectionType' && ct.kind !== 'singleType')
          ).length,
    },
  ];

  const handleRetrieve = async () => {
    setLoadingRetrieve(true);

    try {
      const response = await request('/migrate/models/export', {
        method: 'GET',
      });
      setCollectionTypes(response);

      if (response) {
        setLoadingRetrieve(false);
      }
    } catch (e) {
      strapi.notification.error('Sorry, something went wrong.');
      setLoadingRetrieve(false);
    }
  };

  useEffect(() => {
    handleRetrieve();
  }, []);

  if (loadingRetrieve)
    return (
      <LoadingIndicator
        animationTime="0.6s"
        borderWidth="4px"
        borderColor="#f3f3f3"
        borderTopColor="#555555"
        size="26px"
      />
    );

  return (
    <StyledCardText padding="0 20px">
      <Box py="20px">
        <h3>Hey there! 👋🏼</h3>
        <p>
          Content/Collection Type migrations are coming (hopefully) really soon.
        </p>
      </Box>

      <strong>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/ijsto/strapi-plugin-migrate/issues/6"
        >
          Track the issue or create a PR here.
        </a>
      </strong>

      <Box>
        <Box my="16px">
          <strong style={{ cursor: 'pointer' }}>
            {!isShowMoreOpen && (
              <a onClick={handleOpenShowMore}>Tell me More</a>
            )}
            {isShowMoreOpen && <a onClick={handleCloseShowMore}>Hide</a>}
          </strong>
        </Box>

        {isShowMoreOpen && (
          <div>
            <p>
              Due to lack of time I have been, unfortunately, unable to solve
              this for a little while by now. If you think this is a useful
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

      <Notice>
        Please note that you should (for now) <strong>not rely</strong> on the
        data about Collection Types below.
      </Notice>

      <h3 style={{ marginTop: 16 }}>Collection Types</h3>

      <Box my="20px">
        <CardInfoList list={infoList} />
      </Box>
    </StyledCardText>
  );
};

export default CollectionTypeStats;

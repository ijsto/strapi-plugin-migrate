/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Button } from '@buffetjs/core';
import { useGlobalContext, HeaderNav } from 'strapi-helper-plugin';
// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
// eslint-disable-next-line import/no-extraneous-dependencies
import { camelCase } from 'lodash';

// eslint-disable-next-line import/no-extraneous-dependencies

import getTrad from '../../utils/getTrad';
import basePluginUrl from '../../basePluginUrl';
import Spacer from '../layout/Spacer';

import BackUpModal from './BackUpModal';
import ImportExportTool from './ImportExportTool';

const StyledInfoHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
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

const StyledNotice = styled.div`
  align-items: center;
  background: rgba(0, 123, 255, 0.125);
  border: 2px dashed var(--blue);
  border-radius: 0.25rem;
  display: flex;
  justify-content: space-between;
  padding: 2.5rem;
  .body {
    flex: 2;
  }
  .cta {
    flex: 1;
    text-align: right;
    span {
      display: block;
      font-size: 4em;
      margin-right: 0.75em;
    }
  }
`;

const StyledButtonLink = styled.a`
  align-items: flex-start;
  background-color: #6dbb1a;
  border: 1px solid #6dbb1a;
  border-radius: 2px;
  color: var(--white);
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  font-size: 1.3rem;
  height: 30px;
  letter-spacing: normal;
  line-height: normal;
  margin-top: 20px;
  min-width: 140px;
  outline: 0;
  padding: 5px 15px 2px;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  text-align: center;
  touch-action: manipulation;
  word-spacing: normal;
  &:hover {
    color: var(--white);
    text-decoration: none;
  }
`;

const UserPermissions = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const { formatMessage } = useGlobalContext();

  const tabs = ['export', 'import'].map(tabName => {
    const name = tabName;
    const camelCaseName = camelCase(tabName);

    return {
      name: formatMessage({
        id: getTrad(`UserPermissions.HeaderNav.link.${camelCaseName}`),
      }),
      tabName,
      to: `${basePluginUrl}/user-permissions/${name}`,
    };
  });

  const encodedTwitterMessage = encodeURI(
    formatMessage({ id: getTrad(`Social.share.twitter.text`) })
  );
  const twitterShareLink = `https://twitter.com/intent/tweet?text=${encodedTwitterMessage}`;

  const backupNotice = formatMessage({
    id: getTrad(`UserPermissions.info.backupNotice`),
  });

  return (
    <>
      <Route
        path={`${basePluginUrl}/user-permissions`}
        render={() => (
          <Redirect to={`${basePluginUrl}/user-permissions/export`} />
        )}
        exact
      />

      <StyledNotice>
        <div className="body">
          <h2>Back up</h2>
          <div>{backupNotice}</div>
        </div>
        <div className="cta">
          <span role="img" aria-label="Rocket-launch">
            🚀
          </span>
          <Button label="Back up now" onClick={handleOpenModal} />
        </div>
      </StyledNotice>

      <Spacer />

      <HeaderNav links={tabs} style={{ marginTop: '1.6rem' }} />
      <Route
        path={`${basePluginUrl}/:migrateType/:action`}
        render={props => <ImportExportTool {...props} />}
        exact
      />

      <StyledInfoHeader>
        <div />
        <div className="info">
          <h3>Saved some time?</h3>
          <div>If this plugin helped you save some time and hassle.</div>
          <StyledButtonLink
            target="_blank"
            rel="noreferrer noopener"
            href={twitterShareLink}
          >
            Share it with others!
          </StyledButtonLink>
        </div>
      </StyledInfoHeader>
      <BackUpModal
        isOpen={isModalOpen}
        setOpen={setModalOpen}
        handleOpen={handleOpenModal}
        handleClose={handleCloseModal}
      />
    </>
  );
};

export default UserPermissions;

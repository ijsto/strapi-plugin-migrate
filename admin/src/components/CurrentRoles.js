/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { Flex, InputNumber, Label, Padded } from '@buffetjs/core';
import { request } from 'strapi-helper-plugin';
import { updateObjectInArrayByType } from '../utils/helpers';

const CurrentRoles = ({ currentRoles, setCurrentRoles }) => {
  const [loadingRetrieve, setLoadingRetrieve] = useState(false);
  const [errorRetrieve, setErrorRetrieve] = useState(null);

  const handleRetrieveRoles = async () => {
    setErrorRetrieve(false);
    setLoadingRetrieve(true);

    try {
      const response = await request('/migrate/retrieveCurrentRoles', {
        method: 'GET',
      });

      if (response) {
        setCurrentRoles(response.currentRoles);
        setLoadingRetrieve(false);
      }
    } catch (e) {
      console.log('Error: ', e);
      setErrorRetrieve(true);
      setLoadingRetrieve(false);
    }
  };

  useEffect(() => {
    handleRetrieveRoles();
  }, []);

  if (loadingRetrieve) return 'Loading roles...';
  if (errorRetrieve) return 'Failed loading roles...';

  return (
    <div>
      <h1>Current Roles</h1>
      <div>The role IDs must match with your target environment.</div>

      <Padded top size="smd">
        <Flex justifyContent="center" style={{ flexWrap: 'wrap' }}>
          {currentRoles?.map(role => (
            <Padded right size="10px" style={{ flex: '0 1 143px' }}>
              <Label htmlFor="auth-role">
                {role.name} <b>{role.id}</b>
              </Label>
              <InputNumber
                value={role.newId || role.id}
                onChange={({ target: { value } }) => {
                  setCurrentRoles(
                    updateObjectInArrayByType(currentRoles, {
                      type: role.type,
                      newId: value,
                    }),
                  );
                }}
                name={role.type}
              />
            </Padded>
          ))}
        </Flex>
      </Padded>
    </div>
  );
};

export default CurrentRoles;

/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Flex, InputNumber, Label, Padded } from '@buffetjs/core';

import { updateObjectInArrayByType } from '../utils/helpers';

const CurrentRoles = ({ currentRoles, setCurrentRoles }) => {
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

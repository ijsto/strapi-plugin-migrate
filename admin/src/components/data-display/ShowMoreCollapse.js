import React, { useState } from 'react';
import styled from 'styled-components';


import Box from '../layout/Box';

const StyledShowMoreCollapse = styled(Box)``;

const ShowMoreCollapse = ({
  closeLabel,
  children,
  handleOpen,
  handleClose,
  keepOnDisplay,
  openLabel,
}) => {
  const [isShowMoreOpen, setShowMoreOpen] = useState(false);

  const handleOpenShowMore = () => setShowMoreOpen(true);
  const handleCloseShowMore = () => setShowMoreOpen(false);

  return (
    <StyledShowMoreCollapse>
      <div style={{ marginTop: 16 }}>
        <strong>
          {isShowMoreOpen && (
            <a
              role="button"
              onKeyDown={() => {}}
              tabIndex="0"
              onClick={handleClose || handleCloseShowMore}
            >
              {closeLabel || 'Show Less'}
            </a>
          )}
          {!isShowMoreOpen && (
            <a
              role="button"
              onKeyDown={() => {}}
              tabIndex="0"
              onClick={handleOpen || handleOpenShowMore}
            >
              {openLabel || 'Show More'}
            </a>
          )}
        </strong>
      </div>
      
      {keepOnDisplay && <div>{keepOnDisplay}</div>}

      {isShowMoreOpen && <div>{children}</div>}
    </StyledShowMoreCollapse>
  );
};

export default ShowMoreCollapse;

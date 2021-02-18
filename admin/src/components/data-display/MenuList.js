// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import styled from 'styled-components';

const StyledMenuListContainer = styled.div`
  margin-bottom: 24px;
  .list-header {
    color: #919bae;
    h3 {
      margin-bottom: 10px;
      padding-right: 20px;
      padding-top: 2px;
      font-family: Lato;
      font-size: 1.1rem;
      line-height: normal;
      -webkit-letter-spacing: 0.1rem;
      -moz-letter-spacing: 0.1rem;
      -ms-letter-spacing: 0.1rem;
      letter-spacing: 0.1rem;
      font-weight: bold;
      text-transform: uppercase;
    }
    & > div {
      position: relative;
    }
  }
  .list-wrapper {
  }
`;

const StyledUnorderedList = styled.ul`
  list-style: none;
  margin-bottom: 0;
  margin-top: 0;
  max-height: 182px;
  overflow-y: auto;
  padding-left: 0;
  padding-top: 2px;

  li {
    position: relative;
    margin-bottom: 2px;
  }

  a {
    border-radius: 2px;
    display: block;
    height: 34px;
    padding-left: 30px;
    touch-action: manipulation;
    p {
      color: #2d3138;
      display: flex;
      font-size: 13px;
      justify-content: space-between;
      line-height: 34px;
      margin-bottom: 0;
    }
    &:hover {
      text-decoration: none;
    }
  }
  li {
    color: #292b2c;
    display: list-item;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.5;
    text-transform: capitalize;
    &.active {
      background-color: #e9eaeb;
    }
    svg {
      color: #919bae;
      font-size: 0.5rem;
      height: 1em;
      left: 1.5rem;
      position: absolute;
      top: calc(50% - 0.25rem);
      width: 1em;
    }
  }
`;

const MenuList = ({ menuItems, title, titleIcon }) => {
  return (
    <StyledMenuListContainer>
      <div className="list-header">
        <div className="title-wrapper">
          <h3>
            <span>{title}</span>&nbsp;&nbsp;
            <span className="count-info" datadescr="8">
              {menuItems && menuItems.length}
            </span>
          </h3>
          {titleIcon && <button>{titleIcon}</button>}
        </div>
      </div>
      <div>
        <StyledUnorderedList className="sc-pIJJz CBTvg">
          {menuItems &&
            menuItems.map(listItem => (
              <li>
                <a href={listItem.href}>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="circle"
                    className="svg-inline--fa fa-circle fa-w-16 sc-fzqyOu cExdEJ"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"
                    />
                  </svg>
                  <p>{listItem.label}</p>
                </a>
              </li>
            ))}
        </StyledUnorderedList>
      </div>
    </StyledMenuListContainer>
  );
};

export default MenuList;

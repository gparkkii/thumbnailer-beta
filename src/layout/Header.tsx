import React from 'react';
import { styled } from 'styled-components';

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0px 40px;

  width: 100%;
  height: 64px;

  background: #0c0e27;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.0025);
`;

const Logo = styled.img`
  height: 24px;
  object-fit: contain;
`;

const Header = () => {
  return (
    <StyledHeader>
      <Logo src="/header-logo.svg" alt="logo" />
    </StyledHeader>
  );
};

export default Header;

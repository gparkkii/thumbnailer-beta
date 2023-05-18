import React from 'react';
import { styled } from 'styled-components';
import { Icon } from 'components';

const StyledHeader = styled.header`
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

const LogoBox = styled.div`
  width: 100%;
  height: 24px;
`;

const Header = () => {
  return (
    <StyledHeader>
      <LogoBox>
        <Icon type="logo" alt="logo" size="full" />
      </LogoBox>
    </StyledHeader>
  );
};

export default Header;

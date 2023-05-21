import React from 'react';
import { styled } from 'styled-components';
import { Caption } from '../styles/typography.styles';

const FooterWrapper = styled.footer`
  position: fixed;
  bottom: 0px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <Caption textcolor="gray500">© 2023 gparkkii</Caption>
    </FooterWrapper>
  );
};

export default Footer;

import React from 'react';
import { styled } from 'styled-components';
import Footer from './Footer';
import Header from './Header';

interface BaseLayoutProps {
  children: React.ReactNode;
}

const Container = styled.main`
  width: 100vw;
  height: 100vh;
  padding-top: 64px;
  background-color: ${({ theme }) => theme.colors.gray100};
`;

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div className="thumbnailer">
      <Header />
      <Container>{children}</Container>
      <Footer />
    </div>
  );
};

export default BaseLayout;

import React from 'react';
import { styled } from 'styled-components';
import Header from './Header';

interface BaseLayoutProps {
  children: React.ReactNode;
}

const Container = styled.main`
  width: 100vw;
  height: calc(100vh - 64px); // 100vh - header height
  background-color: ${({ theme }) => theme.colors.gray100};
`;

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div className="thumbnailer">
      <Header />
      <Container>{children}</Container>
    </div>
  );
};

export default BaseLayout;

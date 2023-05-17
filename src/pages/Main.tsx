import React from 'react';
import { styled } from 'styled-components';
import Drawer from '../components/Drawer/Drawer';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 100%;
`;

function Main() {
  return (
    <Container>
      <div></div>
      <Drawer />
    </Container>
  );
}

export default Main;

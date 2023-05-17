import React from 'react';
import { styled } from 'styled-components';
import Tab from './Tab';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 40px 0px;

  gap: 30px;

  width: 360px;
  height: calc(100vh - 64px); // 100vh - header height

  background: #ffffff;
`;

const Drawer = () => {
  return (
    <Wrapper>
      <Tab label="크기">크기</Tab>
      <Tab label="배경색">배경색</Tab>
      <Tab label="문구">문구</Tab>
      <Tab label="텍스트">텍스트</Tab>
    </Wrapper>
  );
};

export default Drawer;

import React from 'react';
import { styled } from 'styled-components';
import ColorPicker from '../Form/ColorPicker';
import CTAButton from '../Form/CTAButton';
import LabelInput from '../Form/LabelInput';
import TextInput from '../Form/TextInput';
import Tab from './Tab';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 40px 0px;

  width: 360px;
  height: calc(100vh - 64px); // 100vh - header height

  background: ${({ theme }) => theme.colors.white};
`;

const TabWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  gap: 30px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0px;
  gap: 28px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0px 20px;
`;

const Drawer = () => {
  return (
    <Wrapper>
      <TabWrapper>
        <Tab label="크기">
          <InputWrapper>
            <LabelInput label="X" name="width" placeholder="넓이" />
            <LabelInput label="Y" name="height" placeholder="높이" />
          </InputWrapper>
          <InputWrapper>
            <LabelInput label="PX" name="paddingX" placeholder="0" />
            <LabelInput label="PY" name="paddingY" placeholder="0" />
          </InputWrapper>
        </Tab>
        <Tab label="배경색">
          <ColorPicker name="backgroundColor" value="#000000" />
        </Tab>
        <Tab label="문구">
          <TextInput name="title" placeholder="문구를 입력해주세요." />
        </Tab>
        <Tab label="텍스트">텍스트</Tab>
      </TabWrapper>
      <ButtonWrapper>
        <CTAButton label="다운로드" />
      </ButtonWrapper>
    </Wrapper>
  );
};

export default Drawer;

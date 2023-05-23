import React, { memo, useState } from 'react';
import { styled } from 'styled-components';
import { TextAlignType, ThumbnailConfigType } from '../../@types/index.type';
import { mediaQuery } from '../../theme/breakpoints';
import {
  ColorPicker,
  CTAButton,
  Dropdown,
  LabelInput,
  TextAlignment,
  TextInput,
  Tab,
} from 'components';

const MobileDrawer = styled.button`
  display: none;
  ${mediaQuery.md} {
    position: fixed;
    top: 64px;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 40px;
    background-color: ${({ theme }) => theme.colors.gray400};
  }
`;

const Wrapper = styled.div`
  position: fixed;
  right: 0;
  z-index: 999;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 32px 0px;

  width: 360px;
  height: calc(100% - 64px); // 100% - header height

  background: ${({ theme }) => theme.colors.white};

  overflow-y: scroll;

  ${mediaQuery.md} {
    position: absolute;
    display: none;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
`;

const TabWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  gap: 24px;
`;

const InputWrapper = styled.div<{ gap?: number }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  width: 100%;
  padding: 0px;

  gap: ${({ gap = 24 }) => `${gap}px`};
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0px 20px;
  margin-top: 32px;
`;

const Margin = styled.div<{ margin: number }>`
  margin-top: ${({ margin }) => margin}px;
  height: 1px;
`;

const FONT_OPTION = [
  { label: 'Noto Sans KR', option: 'Noto Sans KR' },
  { label: 'Noto Serif', option: 'Noto Serif, serif' },
  { label: 'Gmarket Sans', option: 'GmarketSans' },
  { label: 'Pretendard', option: 'Pretendard' },
  { label: 'LINE SEED Sans', option: 'LINESeedKR' },
  { label: 'Montserrat', option: 'Montserrat' },
  { label: 'Poppins', option: 'Poppins' },
];

const FONT_WEIGHT_OPTION = [
  { label: 'Bold', option: 'Bold' },
  { label: 'Medium', option: 500 },
  { label: 'Regular', option: 400 },
  { label: 'Light', option: 'Lighter' },
];

const FONT_SIZE_OPTION = [
  { label: '128px', option: '128px' },
  { label: '96px', option: '96px' },
  { label: '80px', option: '80px' },
  { label: '64px', option: '64px' },
  { label: '48px', option: '48px' },
  { label: '40px', option: '40px' },
  { label: '32px', option: '32px' },
  { label: '24px', option: '24px' },
  { label: '20px', option: '20px' },
  { label: '16px', option: '16px' },
  { label: '15px', option: '15px' },
  { label: '14px', option: '14px' },
  { label: '12px', option: '12px' },
  { label: '8px', option: '8px' },
];

interface DrawerProps extends DrawerInputProps {
  handleDownload: React.MouseEventHandler<HTMLButtonElement>;
}

interface DrawerInputProps {
  values: ThumbnailConfigType;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  handleAlignment?: (type: TextAlignType) => void;
}

const TabContentSizes = ({ values, onChange }: DrawerInputProps) => (
  <>
    <InputWrapper>
      <LabelInput
        value={values.canvasWidth}
        label="X"
        name="canvasWidth"
        placeholder="넓이"
        onChange={onChange}
      />
      <LabelInput
        value={values.canvasHeight}
        label="Y"
        name="canvasHeight"
        placeholder="높이"
        onChange={onChange}
      />
    </InputWrapper>
    <InputWrapper>
      <LabelInput
        label="PX"
        name="canvasPaddingX"
        placeholder="0"
        onChange={onChange}
      />
      <LabelInput
        label="PY"
        name="canvasPaddingY"
        placeholder="0"
        onChange={onChange}
      />
    </InputWrapper>
  </>
);

const TabContentBackground = ({ values, onChange }: DrawerInputProps) => (
  <ColorPicker
    expanded={{ onClick: undefined, ref: undefined }}
    name="backgroundColor"
    value={values.backgroundColor}
    onChange={onChange}
  />
);

const TabContentText = ({ values, onChange }: DrawerInputProps) => (
  <TextInput
    value={values.thumbnailTitle}
    name="thumbnailTitle"
    placeholder={'문구를 입력해주세요.'}
    onChange={onChange}
  />
);

const TabContentFont = ({
  values,
  onChange,
  handleAlignment,
}: DrawerInputProps) => (
  <>
    <Margin margin={-12} />
    <Dropdown
      name="fontFamily"
      value={values.fontFamily}
      options={FONT_OPTION}
      onChange={onChange}
    />
    <InputWrapper gap={20}>
      <Dropdown
        name="fontWeight"
        value={values.fontWeight}
        options={FONT_WEIGHT_OPTION}
        onChange={onChange}
      />
      <Dropdown
        name="fontSize"
        value={values.fontSize}
        options={FONT_SIZE_OPTION}
        onChange={onChange}
      />
    </InputWrapper>
    <Margin margin={-4} />
    <InputWrapper gap={16}>
      <ColorPicker
        value={values.fontColor}
        onChange={onChange}
        expanded={{ onClick: undefined, ref: undefined }}
        name="fontColor"
      />
      <TextAlignment value={values.textAlign} onClick={handleAlignment} />
    </InputWrapper>
  </>
);

const Drawer = ({
  values,
  handleDownload,
  handleAlignment,
  onChange,
}: DrawerProps) => {
  return (
    <>
      <MobileDrawer>썸네일 꾸미기</MobileDrawer>
      <Wrapper>
        <TabWrapper>
          <Tab label="크기">
            <TabContentSizes values={values} onChange={onChange} />
          </Tab>
          <Tab label="배경색">
            <TabContentBackground values={values} onChange={onChange} />
          </Tab>
          <Tab label="문구">
            <TabContentText values={values} onChange={onChange} />
          </Tab>
          <Tab label="텍스트">
            <TabContentFont
              values={values}
              onChange={onChange}
              handleAlignment={handleAlignment}
            />
          </Tab>
        </TabWrapper>
        <ButtonWrapper>
          <CTAButton label="다운로드" onClick={handleDownload} />
        </ButtonWrapper>
      </Wrapper>
    </>
  );
};

export default memo(Drawer);

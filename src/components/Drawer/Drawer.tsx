import React, { memo } from 'react';
import { styled } from 'styled-components';
import { ThumbnailConfigType } from '../../@types/index.type';
import {
  ColorPicker,
  CTAButton,
  Dropdown,
  LabelInput,
  TextAlignment,
  TextInput,
  Tab,
} from 'components';

const Wrapper = styled.div`
  position: fixed;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 32px 0px;

  width: 360px;
  height: calc(100% - 64px); // 100% - header height

  background: ${({ theme }) => theme.colors.white};

  overflow-y: scroll;
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
  { label: 'Noto Sans', option: 'Noto Sans' },
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
  onInputChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const TabContentSizes = ({ values, onInputChange }: DrawerInputProps) => (
  <>
    <InputWrapper>
      <LabelInput
        value={values.canvasWidth}
        label="X"
        name="canvasWidth"
        placeholder="넓이"
        onChange={onInputChange}
      />
      <LabelInput
        value={values.canvasHeight}
        label="Y"
        name="canvasHeight"
        placeholder="높이"
        onChange={onInputChange}
      />
    </InputWrapper>
    <InputWrapper>
      <LabelInput label="PX" name="canvasPaddingX" placeholder="0" />
      <LabelInput label="PY" name="canvasPaddingY" placeholder="0" />
    </InputWrapper>
  </>
);

const TabContentBackground = ({ values, onInputChange }: DrawerInputProps) => (
  <ColorPicker
    expanded={{ onClick: undefined, ref: undefined }}
    name="backgroundColor"
    value={values.backgroundColor}
    onChange={onInputChange}
  />
);

const TabContentText = ({ values, onInputChange }: DrawerInputProps) => (
  <TextInput
    value={values.thumbnailTitle}
    name="thumbnailTitle"
    placeholder={'문구를 입력해주세요.'}
    onChange={onInputChange}
  />
);

const TabContentFont = () => (
  <>
    <Margin margin={-12} />
    <Dropdown placeholder="폰트를 선택해주세요." options={FONT_OPTION} />
    <InputWrapper gap={20}>
      <Dropdown placeholder="Medium" options={FONT_WEIGHT_OPTION} />
      <Dropdown placeholder="40px" options={FONT_SIZE_OPTION} />
    </InputWrapper>
    <Margin margin={-4} />
    <InputWrapper gap={16}>
      <ColorPicker
        expanded={{ onClick: undefined, ref: undefined }}
        name="backgroundColor"
        value="#000000"
      />
      <TextAlignment />
    </InputWrapper>
  </>
);

const Drawer = ({ values, handleDownload, onInputChange }: DrawerProps) => {
  return (
    <Wrapper>
      <TabWrapper>
        <Tab label="크기">
          <TabContentSizes values={values} onInputChange={onInputChange} />
        </Tab>
        <Tab label="배경색">
          <TabContentBackground values={values} onInputChange={onInputChange} />
        </Tab>
        <Tab label="문구">
          <TabContentText values={values} onInputChange={onInputChange} />
        </Tab>
        <Tab label="텍스트">
          <TabContentFont />
        </Tab>
      </TabWrapper>
      <ButtonWrapper>
        <CTAButton label="다운로드" onClick={handleDownload} />
      </ButtonWrapper>
    </Wrapper>
  );
};

export default memo(Drawer);

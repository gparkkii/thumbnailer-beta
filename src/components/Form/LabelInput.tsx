import React, { memo } from 'react';
import { styled } from 'styled-components';
import TextInput from './TextInput';
import { Content } from 'styles/typography.styles';

interface LabelInputProps {
  label: string;
  placeholder: string;
  name: string;
  value?: number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const LabelInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0px;
`;

const LabelBox = styled.div`
  width: 24px;
  margin-right: 8px;
`;

const LabelInput = ({
  name,
  label,
  placeholder,
  value,
  onChange,
}: LabelInputProps) => {
  return (
    <LabelInputWrapper>
      <LabelBox>
        <Content textcolor="gray600">{label}</Content>
      </LabelBox>
      <TextInput
        name={name}
        placeholder={placeholder}
        value={value?.toString()}
        onChange={onChange}
      />
    </LabelInputWrapper>
  );
};

export default memo(LabelInput);

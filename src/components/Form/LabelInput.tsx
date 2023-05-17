import React from 'react';
import { styled } from 'styled-components';
import { Content } from '../../styles/typography';
import TextInput from './TextInput';

interface LabelInputProps {
  label: string;
  placeholder: string;
  name: string;
  value?: string;
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
        <Content textColor="gray600">{label}</Content>
      </LabelBox>
      <TextInput
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </LabelInputWrapper>
  );
};

export default LabelInput;

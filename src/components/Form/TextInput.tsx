import React, { memo } from 'react';
import { styled } from 'styled-components';

const StyledInput = styled.input`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;

  width: 100%;
  height: 44px;

  background-color: ${({ theme }) => theme.colors.gray100};

  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: 8px;

  color: ${({ theme }) => theme.colors.gray800};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray500};
    font-weight: 400;
  }

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.gray300};
  }

  &:focus {
    background: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.primary100};
  }
`;

interface TextInputProps {
  placeholder: string;
  name: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const TextInput = ({ name, value, placeholder, onChange }: TextInputProps) => {
  return (
    <StyledInput
      type="text"
      name={name}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
  );
};

export default memo(TextInput);

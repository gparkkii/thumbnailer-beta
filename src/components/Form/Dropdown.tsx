import React, { memo } from 'react';
import { styled } from 'styled-components';
import Icon from '../Common/Icon';

interface DropdownProps {
  placeholder: string;
  options: { label: string; option: string | number }[];
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

const DropdownWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 44px;

  background-color: ${({ theme }) => theme.colors.gray100};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: 8px;
`;

const StyledSelect = styled.select`
  display: flex;
  align-items: center;

  width: 100%;
  height: 100%;
  padding: 8px 16px;

  color: ${({ theme }) => theme.colors.gray800};
`;

const IconBox = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  pointer-events: none;
`;

const Dropdown = ({ options, placeholder, value, onChange }: DropdownProps) => {
  return (
    <DropdownWrapper>
      <StyledSelect value={value} placeholder={placeholder} onChange={onChange}>
        {options.map(({ label, option }, index) => (
          <option key={`${option}_${index}`} value={option}>
            {label}
          </option>
        ))}
      </StyledSelect>
      <IconBox>
        <Icon type="arrowDown" alt="expand-dropdown" size="sm" />
      </IconBox>
    </DropdownWrapper>
  );
};

export default memo(Dropdown);

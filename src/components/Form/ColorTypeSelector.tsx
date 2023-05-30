import React from 'react';
import { styled } from 'styled-components';
import { Subtext } from '../../styles/typography.styles';
import Icon from '../Common/Icon';

const TypeBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 20px;
`;

const DropdownWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const StyledSelect = styled.select`
  padding-right: 36px;
  text-align: right;
  color: ${({ theme }) => theme.colors.gray800};
`;

const IconBox = styled.div`
  position: absolute;
  top: 0px;
  right: 4px;
  pointer-events: none;
`;

interface ColorTypeSelectorProps {
  name: string;
  options: { label: string; option: string | number }[];
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

const ColorTypeSelector = ({
  name,
  options,
  onChange,
  value,
}: ColorTypeSelectorProps) => {
  return (
    <TypeBox>
      <Subtext>Type</Subtext>
      <DropdownWrapper>
        <StyledSelect name={name} onChange={onChange} value={value}>
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
    </TypeBox>
  );
};

export default ColorTypeSelector;

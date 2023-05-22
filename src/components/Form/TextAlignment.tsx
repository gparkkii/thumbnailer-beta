import React from 'react';
import { styled } from 'styled-components';
import { TextAlign, TextAlignType } from '../../@types/index.type';
import Icon from '../Common/Icon';

const ToggleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-left: 6px;
  margin-right: -6px;

  width: 100%;
  height: 44px;
`;

const Button = styled.button<TextAlignmentStyledProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 44px;
  height: 44px;

  border-radius: 8px;
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.gray200 : theme.colors.white};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary100};
  }
`;

interface TextAlignmentStyledProps {
  selected?: boolean;
}

interface TextAlignmentProps {
  value?: TextAlignType;
  onClick?: (type: TextAlignType) => void;
}

const TextAlignment = ({ value, onClick }: TextAlignmentProps) => {
  return (
    <ToggleWrapper>
      <Button
        name={TextAlign.left}
        onClick={() => onClick && onClick(TextAlign.left)}
        selected={value === TextAlign.left}
      >
        <Icon type="alignLeft" size="md" alt="text-align-left" />
      </Button>
      <Button
        name={TextAlign.center}
        onClick={() => onClick && onClick(TextAlign.center)}
        selected={value === TextAlign.center}
      >
        <Icon type="alignCenter" size="md" alt="text-align-center" />
      </Button>
      <Button
        name={TextAlign.right}
        onClick={() => onClick && onClick(TextAlign.right)}
        selected={value === TextAlign.right}
      >
        <Icon type="alignRight" size="md" alt="text-align-right" />
      </Button>
    </ToggleWrapper>
  );
};

export default TextAlignment;

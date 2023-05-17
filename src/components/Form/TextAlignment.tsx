import React from 'react';
import { styled } from 'styled-components';
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
  background-color: ${({ active, theme }) =>
    active ? theme.colors.gray200 : theme.colors.white};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary100};
  }
`;

interface TextAlignmentStyledProps {
  active?: boolean;
}

interface TextAlignmentProps {
  value?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const TextAlignment = ({ value, onClick }: TextAlignmentProps) => {
  return (
    <ToggleWrapper>
      <Button name="left" onClick={onClick} active={value === 'left'}>
        <Icon type="alignLeft" size="md" alt="text-align-left" />
      </Button>
      <Button name="center" onClick={onClick} active={value === 'center'}>
        <Icon type="alignCenter" size="md" alt="text-align-center" />
      </Button>
      <Button name="right" onClick={onClick} active={value === 'right'}>
        <Icon type="alignRight" size="md" alt="text-align-right" />
      </Button>
    </ToggleWrapper>
  );
};

export default TextAlignment;

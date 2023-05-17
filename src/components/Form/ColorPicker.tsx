import React from 'react';
import { styled } from 'styled-components';
import { Subtext } from '../../styles/typography';

interface ColorPickerProps {
  name: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  fullSize?: {
    ref?: React.RefObject<HTMLInputElement>;
    onClick?: () => void;
  };
}

const PickerWrapper = styled.div<{ fullSize?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  width: ${({ fullSize }) => (fullSize ? '100%' : '44px')};
  height: 44px;

  background: ${({ theme }) => theme.colors.white};

  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: 8px;
`;

const StyledPicker = styled.input`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 44px;
  height: 44px;
  padding: 10px;
`;

const TextBox = styled.div`
  margin-left: 8px;
`;

const ColorPicker = ({ fullSize, name, value, onChange }: ColorPickerProps) => {
  return (
    <PickerWrapper
      fullSize={fullSize !== undefined}
      onClick={fullSize?.onClick}
    >
      <StyledPicker
        ref={fullSize?.ref}
        name={name}
        value={value}
        type="color"
        onChange={onChange}
      />
      {fullSize && (
        <TextBox>
          <Subtext>{value}</Subtext>
        </TextBox>
      )}
    </PickerWrapper>
  );
};

export default ColorPicker;

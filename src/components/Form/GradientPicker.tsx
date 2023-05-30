import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Subtext } from '../../styles/typography.styles';
import ColorPicker from './ColorPicker';

const PickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 12px;
  width: 100%;
`;

const DraggableWrapper = styled.div<{
  draggedIndex: number | null;
  currentIndex: number;
  isDeleting: boolean;
}>`
  width: 100%;
  opacity: ${({ draggedIndex, currentIndex, isDeleting }) =>
    isDeleting ? 0 : draggedIndex === currentIndex ? 0.5 : 1};
  transform: ${({ draggedIndex, currentIndex, isDeleting }) =>
    isDeleting
      ? draggedIndex === currentIndex
        ? 'translateX(100%)'
        : 'none'
      : draggedIndex === currentIndex
      ? 'scale(0.95)'
      : 'scale(1)'};
  transition: opacity 0.3s, transform 0.3s;
`;

const ColorPickerRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 24px;
`;

const DeleteButton = styled.button`
  margin-right: 4px;
  background-color: transparent;
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  &:disabled svg,
  svg:hover {
    rect,
    path {
      stroke: ${({ theme, disabled }) =>
        disabled ? theme.colors.gray400 : theme.colors.red};
    }
  }
`;

const AddButton = styled.button`
  margin-top: 12px;
  background-color: transparent;
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  & p {
    color: ${({ theme, disabled }) =>
      disabled ? theme.colors.gray400 : theme.colors.primary200};
  }
`;

const DeleteIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="0.75"
      y="0.75"
      width="22.5"
      height="22.5"
      rx="11.25"
      stroke="#FFC2BE"
      strokeWidth="1.5"
    />
    <path d="M7 12H17" stroke="#FF675E" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

interface GradientPickerProps {
  colors: string[];
  onChange?: (colors: string[]) => void;
}

const GradientPicker = ({ colors, onChange }: GradientPickerProps) => {
  const [draggedColorIndex, setDraggedColorIndex] = useState<number | null>(
    null,
  );
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);

  const handleColorChange = (index: number, value: string) => {
    const updatedColors = [...colors];
    updatedColors[index] = value;
    if (onChange) {
      onChange(updatedColors);
    }
  };

  const handleColorDelete = (index: number) => {
    if (colors.length <= 2) {
      return;
    }

    setDeletingIndex(index);

    setTimeout(() => {
      const updatedColors = [...colors];
      updatedColors.splice(index, 1);
      if (onChange) {
        onChange(updatedColors);
      }
      setDeletingIndex(null);
    }, 300);
  };

  const handleDragStart = (index: number) => {
    setDraggedColorIndex(index);
  };

  const handleDragOver = (index: number) => {
    if (draggedColorIndex !== null) {
      const updatedColors = [...colors];
      const draggedColor = updatedColors[draggedColorIndex];
      updatedColors.splice(draggedColorIndex, 1);
      updatedColors.splice(index, 0, draggedColor);
      setDraggedColorIndex(index);
      if (onChange) {
        onChange(updatedColors);
      }
    }
  };

  const handleDragEnd = () => {
    setDraggedColorIndex(null);
  };

  const handleAddColor = () => {
    if (colors.length < 5) {
      const updatedColors = [...colors, '#000000'];
      if (onChange) {
        onChange(updatedColors);
      }
    }
  };

  return (
    <PickerContainer>
      {colors.map((color, index) => (
        <DraggableWrapper
          key={index}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={() => handleDragOver(index)}
          onDragEnd={handleDragEnd}
          draggedIndex={draggedColorIndex}
          currentIndex={index}
          isDeleting={deletingIndex === index}
        >
          <ColorPickerRow>
            <ColorPicker
              expanded={{ ref: undefined, onClick: undefined }}
              name="color"
              value={color}
              onChange={e => handleColorChange(index, e.target.value)}
            />
            <DeleteButton
              onClick={() => handleColorDelete(index)}
              disabled={colors.length <= 2}
            >
              <DeleteIcon />
            </DeleteButton>
          </ColorPickerRow>
        </DraggableWrapper>
      ))}
      <AddButton onClick={handleAddColor} disabled={colors.length >= 5}>
        <Subtext>색상 추가</Subtext>
      </AddButton>
    </PickerContainer>
  );
};

export default GradientPicker;

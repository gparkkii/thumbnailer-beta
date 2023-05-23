import React, { memo } from 'react';
import { styled } from 'styled-components';
import { mediaQuery } from '../../theme/breakpoints';
import Icon from '../Common/Icon';
import { Title } from 'styles/typography.styles';

const ZoomContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  gap: 20px;

  ${mediaQuery.sm} {
    gap: 10px;
  }
`;

interface ZoomControllerProps {
  value: number;
  handleZoom: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    type: 'in' | 'out',
  ) => void;
}

const ZoomController = ({ handleZoom, value }: ZoomControllerProps) => {
  return (
    <ZoomContainer>
      <button name="zoomLevel" onClick={e => handleZoom(e, 'out')}>
        <Icon size="lg" type="zoomOut" alt="zoomOut" />
      </button>
      <Title>{(value * 100).toFixed(0)}%</Title>
      <button name="zoomLevel" onClick={e => handleZoom(e, 'in')}>
        <Icon size="lg" type="zoomIn" alt="zoomIn" />
      </button>
    </ZoomContainer>
  );
};

export default memo(ZoomController);

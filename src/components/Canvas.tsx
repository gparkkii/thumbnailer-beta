import React, { memo } from 'react';
import { styled } from 'styled-components';
import { mediaQuery } from '../theme/breakpoints';

interface CanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  width: number;
  height: number;
  zoomLevel: number;
}

const CanvasContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: calc(100% - 360px); // - drawer width
  height: calc(100% - 64px); // - drawer height
  overflow: auto;

  ${mediaQuery.md} {
    width: 100%;
    height: 100%;
  }
`;

const Canvas = ({ canvasRef, width, height, zoomLevel }: CanvasProps) => {
  return (
    <CanvasContainer>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{
          transform: `scale(${zoomLevel})`,
          border: '2px dashed #aaa',
        }}
      />
    </CanvasContainer>
  );
};

export default memo(Canvas);

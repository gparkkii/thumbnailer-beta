import React from 'react';
import { styled } from 'styled-components';

interface CanvasProps {
  width: number;
  height: number;
  canvasRef?: React.RefObject<HTMLCanvasElement>;
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
`;

const Canvas = ({ canvasRef, width, height }: CanvasProps) => {
  return (
    <CanvasContainer>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{
          transformOrigin: '0 0',
          border: '1px dashed black',
        }}
      />
    </CanvasContainer>
  );
};

export default Canvas;

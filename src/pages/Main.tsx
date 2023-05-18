import React, { useCallback, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import Canvas from '../components/Canvas';
import Drawer from '../components/Drawer/Drawer';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  width: 100vw;
  height: 100%;
`;

const ZoomController = styled.div`
  position: absolute;
  z-index: 999;
`;

function Main() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [canvasWidth, setCanvasWidth] = useState(900);
  const [canvasHeight, setCanvasHeight] = useState(600);

  const handleZoomIn = useCallback(() => {
    setZoomLevel(prevZoom => prevZoom + 0.1);
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel(prevZoom => Math.max(prevZoom - 0.1, 0.1));
  }, []);

  const drawThumbnail = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      scaledWidth: number,
      scaledHeight: number,
      applyScaling?: boolean,
    ) => {
      // Clear canvas
      ctx.clearRect(0, 0, scaledWidth, scaledHeight);

      // Draw thumbnail
      ctx.fillStyle = 'lightblue';
      ctx.fillRect(0, 0, scaledWidth, scaledHeight);

      const baseFontSize = 80;
      const zoomedFontSize = baseFontSize * zoomLevel;
      const scaledFontSize = applyScaling
        ? zoomedFontSize * (canvasWidth / (canvasWidth * zoomLevel))
        : zoomedFontSize;
      const fontSize = applyScaling ? scaledFontSize : zoomedFontSize;
      ctx.font = `bold ${fontSize}px GmarketSans`;
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Thumbnail', scaledWidth / 2, scaledHeight / 2);
    },
    [canvasWidth, zoomLevel],
  );

  const generateThumbnail = useCallback(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        const scaledWidth = canvasWidth * zoomLevel;
        const scaledHeight = canvasHeight * zoomLevel;
        canvas.width = scaledWidth;
        canvas.height = scaledHeight;

        drawThumbnail(ctx, scaledWidth, scaledHeight);
      }
    }
  }, [canvasWidth, canvasHeight, zoomLevel, drawThumbnail]);

  useEffect(() => {
    generateThumbnail();
  }, [generateThumbnail]);

  const handleDownload = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (canvasRef.current) {
        const downloadCanvas = document.createElement('canvas');
        downloadCanvas.width = canvasWidth;
        downloadCanvas.height = canvasHeight;

        const downloadCtx = downloadCanvas.getContext('2d');
        if (downloadCtx) {
          drawThumbnail(downloadCtx, canvasWidth, canvasHeight, true);

          const dataUrl = downloadCanvas.toDataURL('image/png');

          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = 'thumbnail.png';
          link.click();
        }
      }
    },
    [canvasWidth, canvasHeight, drawThumbnail],
  );

  return (
    <Container>
      <Canvas
        canvasRef={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        zoomLevel={zoomLevel}
      />
      <Drawer handleDownload={handleDownload} />
      <ZoomController>
        <button onClick={handleZoomIn}>Zoom In</button>
        <button onClick={handleZoomOut}>Zoom Out</button>
      </ZoomController>
    </Container>
  );
}

export default Main;

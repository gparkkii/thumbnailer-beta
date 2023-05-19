import React, { useCallback, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import RatioController from '../components/Controls/RatioController';
import { Canvas, Drawer, ZoomController } from 'components';

const Container = styled.div`
  position: relative;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  width: 100vw;
  height: 100%;
`;

const CanvasController = styled.div`
  position: absolute;
  bottom: 80px;

  right: 50%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 40px;

  width: 420px;
  height: 60px;
  border-radius: 100px;

  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.17);
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  border: 1px solid rgba(255, 255, 255, 0.18);

  & p {
    color: rgba(31, 38, 135, 0.27);
  }
`;

const THUMBNAIL_INITIAL_SETTINGS = {
  zoomLevel: 1,
  canvasWidth: 900,
  canvasHeight: 600,
  canvasPaddingX: 0,
  canvasPaddingY: 0,
  thumbnailTitle: '문구를 입력해주세요.',
  backgroundColor: '#9CD4E6',
  fontSize: 40,
  fontFamily: 'Noto Sans',
  fontWeight: 'Bold',
  fontColor: '#FFFFFF',
  textAlign: 'center' as CanvasTextAlign,
};

function Main() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [thumnbnailConfig, setThumnbnailConfig] = useState(
    THUMBNAIL_INITIAL_SETTINGS,
  );
  const {
    canvasWidth,
    canvasHeight,
    canvasPaddingX,
    canvasPaddingY,
    backgroundColor,
    thumbnailTitle,
    fontFamily,
    fontWeight,
    fontSize,
    fontColor,
    textAlign,
    zoomLevel,
  } = thumnbnailConfig;

  // const [zoomLevel, setZoomLevel] = useState(
  //   THUMBNAIL_INITIAL_SETTINGS.zoomLevel,
  // );
  // const [canvasWidth, setCanvasWidth] = useState(
  //   THUMBNAIL_INITIAL_SETTINGS.canvasWidth,
  // );
  // const [canvasHeight, setCanvasHeight] = useState(
  //   THUMBNAIL_INITIAL_SETTINGS.canvasHeight,
  // );
  // const [canvasPaddingX, setCanvasPaddingX] = useState(
  //   THUMBNAIL_INITIAL_SETTINGS.canvasPaddingX,
  // );
  // const [canvasPaddingY, setCanvasPaddingY] = useState(
  //   THUMBNAIL_INITIAL_SETTINGS.canvasPaddingY,
  // );
  // const [thumbnailTitle, setThumbnailTitle] = useState(
  //   THUMBNAIL_INITIAL_SETTINGS.thumbnailTitle,
  // );
  // const [backgroundColor, setBackgroundColor] = useState(
  //   THUMBNAIL_INITIAL_SETTINGS.backgroundColor,
  // );
  // const [fontSize, setFontSize] = useState(THUMBNAIL_INITIAL_SETTINGS.fontSize);
  // const [fontFamily, setFontFamily] = useState(
  //   THUMBNAIL_INITIAL_SETTINGS.fontFamily,
  // );
  // const [fontWeight, setFontWeight] = useState(
  //   THUMBNAIL_INITIAL_SETTINGS.fontWeight,
  // );
  // const [fontColor, setFontColor] = useState(
  //   THUMBNAIL_INITIAL_SETTINGS.fontColor,
  // );
  // const [textAlign, setTextAlign] = useState(
  //   THUMBNAIL_INITIAL_SETTINGS.textAlign,
  // );

  const handleZoom = useCallback(
    (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      type: 'in' | 'out',
    ) => {
      e.preventDefault();
      setThumnbnailConfig(prev => ({
        ...prev,
        zoomLevel:
          type === 'in'
            ? prev.zoomLevel + 0.1
            : Math.max(prev.zoomLevel - 0.1, 0.1),
      }));
    },
    [],
  );

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
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, scaledWidth, scaledHeight);

      const zoomedFontSize = fontSize * zoomLevel;
      const scaledFontSize = applyScaling
        ? zoomedFontSize * (canvasWidth / (canvasWidth * zoomLevel))
        : zoomedFontSize;
      const finalFontSize = applyScaling ? scaledFontSize : zoomedFontSize;
      ctx.font = `${fontWeight} ${finalFontSize}px ${fontFamily}`;
      ctx.fillStyle = fontColor;
      ctx.textAlign = textAlign;
      ctx.textBaseline = 'middle';
      ctx.fillText(thumbnailTitle, scaledWidth / 2, scaledHeight / 2);
    },
    [
      backgroundColor,
      canvasWidth,
      fontColor,
      fontFamily,
      fontSize,
      fontWeight,
      textAlign,
      thumbnailTitle,
      zoomLevel,
    ],
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
  }, [canvasWidth, zoomLevel, canvasHeight, drawThumbnail]);

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
      <CanvasController>
        <ZoomController handleZoom={handleZoom} value={zoomLevel} />
        <p>|</p>
        <RatioController />
      </CanvasController>
    </Container>
  );
}

export default Main;

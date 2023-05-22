import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { ThumbnailConfigType } from '../@types/index.type';
import {
  Canvas,
  Drawer,
  ZoomController,
  RatioController,
  Ratio,
} from 'components';

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
  bottom: 60px;

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

const THUMBNAIL_INITIAL_SETTINGS: ThumbnailConfigType = {
  zoomLevel: 1,
  canvasWidth: 900,
  canvasHeight: 600,
  canvasPaddingX: 0,
  canvasPaddingY: 0,
  thumbnailTitle: '문구를 입력해주세요.',
  backgroundColor: '#b7e2f0',
  fontSize: '40px',
  fontFamily: 'Noto Sans',
  fontWeight: 'Bold',
  fontColor: '#000000',
  textAlign: 'center',
};

const RATIO_CONFIGS = {
  [Ratio.DESKTOP]: {
    canvasWidth: 1920,
    canvasHeight: 1080,
    fontSize: '48px',
  },
  [Ratio.TABLET]: {
    canvasWidth: 768,
    canvasHeight: 1024,
    fontSize: '32px',
  },
  [Ratio.MOBILE]: {
    canvasWidth: 360,
    canvasHeight: 640,
    fontSize: '24px',
  },
};

function Main() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeRatio, setActiveRatio] = useState<Ratio>();
  const [thumbnailConfig, setThumbnailConfig] = useState(
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
  } = thumbnailConfig;

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      if (name === 'canvasWidth' || name === 'canvasHeight') {
        setActiveRatio(undefined);
      }
      setThumbnailConfig(prev => ({ ...prev, [name]: value }));
    },
    [],
  );

  const handleZoom = useCallback(
    (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      type: 'in' | 'out',
    ) => {
      e.preventDefault();
      setThumbnailConfig(prev => ({
        ...prev,
        zoomLevel:
          type === 'in'
            ? prev.zoomLevel + 0.1
            : Math.max(prev.zoomLevel - 0.1, 0.1),
      }));
    },
    [],
  );

  const handleRatio = useCallback((ratio: Ratio) => {
    setActiveRatio(ratio);
    setThumbnailConfig(prev => ({
      ...prev,
      ...RATIO_CONFIGS[ratio],
    }));
  }, []);

  const splitTextIntoLines = (
    text: string,
    context: CanvasRenderingContext2D,
    maxWidth: number,
    maxHeight: number,
    paddingX: number,
    paddingY: number,
    lineHeight: number,
  ): string[] => {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const { width } = context.measureText(`${currentLine} ${word}`);

      if (width < maxWidth - paddingX * 2) {
        currentLine += (currentLine === '' ? '' : ' ') + word;
      } else {
        lines.push(currentLine.trim());
        currentLine = word;
      }

      if (lines.length * lineHeight > maxHeight - paddingY * 2) {
        break;
      }
    }

    if (currentLine !== '') {
      lines.push(currentLine.trim());
    }

    return lines;
  };

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

      const zoomedFontSize = parseInt(fontSize) * zoomLevel;
      const scaledFontSize =
        zoomedFontSize * (canvasWidth / (canvasWidth * zoomLevel));
      const finalFontSize = applyScaling ? scaledFontSize : zoomedFontSize;

      ctx.font = `${fontWeight} ${finalFontSize}px ${fontFamily}`;
      ctx.fillStyle = fontColor;
      ctx.textAlign = textAlign;
      ctx.textBaseline = 'top';

      const lineHeight = finalFontSize * 1.2;

      const lines = splitTextIntoLines(
        thumbnailTitle,
        ctx,
        scaledWidth,
        scaledHeight,
        canvasPaddingX,
        canvasPaddingY,
        lineHeight,
      );

      let offsetY = scaledHeight / 2 - (lines.length * lineHeight) / 2;
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const lineY = offsetY;
        ctx.fillText(line, scaledWidth / 2, lineY);
        offsetY += lineHeight;
      }
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
      canvasPaddingX,
      canvasPaddingY,
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
      <Drawer
        values={thumbnailConfig}
        handleDownload={handleDownload}
        onChange={handleInput}
      />
      <CanvasController>
        <ZoomController handleZoom={handleZoom} value={zoomLevel} />
        <p>|</p>
        <RatioController ratio={activeRatio} onClick={handleRatio} />
      </CanvasController>
    </Container>
  );
}

export default memo(Main);

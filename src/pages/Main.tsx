import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import {
  Ratio,
  RatioType,
  TextAlign,
  TextAlignType,
  ThumbnailConfigType,
} from '../@types/index.type';
import { mediaQuery } from '../theme/breakpoints';
import {
  Canvas,
  Drawer,
  ZoomController,
  RatioController,
  CTAButton,
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

const ThumbnailController = styled.div`
  position: absolute;
  width: 620px;
  bottom: 60px;
  left: calc(
    50% - 490px
  ); // (620px(thumbnailcontroller width) / 2) + (360px(Drawer width) / 2) = 490px

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 30px;

  ${mediaQuery.md} {
    left: calc(50% - 310px);
  }
`;

const CanvasController = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 40px;

  height: 56px;
  padding: 0px 40px;
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

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 160px;
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
  fontFamily: 'Noto Sans KR',
  fontWeight: 'Bold',
  fontColor: '#000000',
  textAlign: 'center',
};

const RATIO_CONFIGS = {
  [Ratio.desktop]: {
    canvasWidth: 1920,
    canvasHeight: 1080,
    fontSize: '48px',
  },
  [Ratio.tablet]: {
    canvasWidth: 768,
    canvasHeight: 1024,
    fontSize: '32px',
  },
  [Ratio.mobile]: {
    canvasWidth: 360,
    canvasHeight: 640,
    fontSize: '24px',
  },
};

function Main() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeRatio, setActiveRatio] = useState<RatioType>();
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

  const handleTextAlignment = useCallback((type: TextAlignType) => {
    setThumbnailConfig(prev => ({
      ...prev,
      textAlign: type,
    }));
  }, []);

  const handleRatio = useCallback((ratio: RatioType) => {
    setActiveRatio(ratio);
    setThumbnailConfig(prev => ({
      ...prev,
      ...RATIO_CONFIGS[ratio],
    }));
  }, []);

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

        // Calculate X position based on text alignment
        let lineX = scaledWidth / 2; // Default center alignment
        if (textAlign === TextAlign.left) {
          lineX = canvasPaddingX;
        } else if (textAlign === TextAlign.right) {
          lineX = scaledWidth - canvasPaddingX;
        }

        ctx.fillText(line, lineX, lineY);
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
        handleAlignment={handleTextAlignment}
        onChange={handleInput}
      />
      <ThumbnailController>
        <CanvasController>
          <ZoomController handleZoom={handleZoom} value={zoomLevel} />
          <p>|</p>
          <RatioController ratio={activeRatio} onClick={handleRatio} />
        </CanvasController>
        <ButtonWrapper>
          <CTAButton label="다운로드" onClick={handleDownload} />
        </ButtonWrapper>
      </ThumbnailController>
    </Container>
  );
}

export default memo(Main);

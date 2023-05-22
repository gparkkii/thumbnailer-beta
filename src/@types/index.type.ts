export const TextAlign = {
  left: 'left',
  center: 'center',
  right: 'right',
} as const;

export type TextAlignType = keyof typeof TextAlign;

export type ThumbnailConfigType = {
  zoomLevel: number;
  canvasWidth: number;
  canvasHeight: number;
  canvasPaddingX: number;
  canvasPaddingY: number;
  thumbnailTitle: string;
  backgroundColor: string;
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  fontColor: string;
  textAlign: TextAlignType;
};

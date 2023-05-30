export const TextAlign = {
  left: 'left',
  center: 'center',
  right: 'right',
} as const;
export type TextAlignType = keyof typeof TextAlign;

export const Ratio = {
  desktop: 'desktop', // 16:9
  tablet: 'tablet', // 4:3
  mobile: 'mobile', // 9:16
} as const;
export type RatioType = keyof typeof Ratio;

export const ColorSelector = {
  linear: 'linear',
  gradient: 'gradient',
} as const;
export type ColorSelectorType = keyof typeof ColorSelector;

export type ThumbnailConfigType = {
  zoomLevel: number;
  canvasWidth: number;
  canvasHeight: number;
  canvasPaddingX: number;
  canvasPaddingY: number;
  thumbnailTitle: string;
  colorType: ColorSelectorType;
  backgroundColor: string;
  gradientColors: string[];
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  fontColor: string;
  textAlign: TextAlignType;
};

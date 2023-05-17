export type ThumbnailerColorType = keyof typeof color;

export const color = {
  black: '#000000',
  white: '#FFFFFF',
  gray100: '#FAFAFA',
  gray200: '#EEEEEE',
  gray300: '#D5D5D5',
  gray400: '#CCCCCC',
  gray500: '#AAAAAA',
  gray600: '#757575',
  gray700: '#606060',
  gray800: '#454545',
  gray900: '#3B3B3B',
  primary100: '#36DBD1',
  primary200: '#2AC4B9',
} as const;

export const theme = {
  colors: color,
};

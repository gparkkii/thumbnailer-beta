import { styled } from 'styled-components';
import { ThumbnailerColorType } from '../theme';

interface FontColorStyledProps {
  textcolor?: ThumbnailerColorType;
}

export const Title = styled.h3<FontColorStyledProps>`
  font-family: 'Montserrat';
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: ${({ theme, textcolor }) =>
    textcolor ? theme.colors[textcolor] : theme.colors.black};
`;

export const Subtitle = styled.h6<FontColorStyledProps>`
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 16px;
  line-height: 21px;
  color: ${({ theme, textcolor }) =>
    textcolor ? theme.colors[textcolor] : theme.colors.black};
`;

export const Subtext = styled.p<FontColorStyledProps>`
  font-family: 'Pretendard';
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: ${({ theme, textcolor }) =>
    textcolor ? theme.colors[textcolor] : theme.colors.black};
`;

export const Content = styled.p<FontColorStyledProps>`
  font-family: 'LINESeedKR';
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  color: ${({ theme, textcolor }) =>
    textcolor ? theme.colors[textcolor] : theme.colors.black};
`;

export const Body = styled.p<FontColorStyledProps>`
  font-family: 'LINESeedKR';
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: ${({ theme, textcolor }) =>
    textcolor ? theme.colors[textcolor] : theme.colors.black};
`;

export const Caption = styled.p<FontColorStyledProps>`
  font-family: 'LINESeedKR';
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: ${({ theme, textcolor }) =>
    textcolor ? theme.colors[textcolor] : theme.colors.black};
`;

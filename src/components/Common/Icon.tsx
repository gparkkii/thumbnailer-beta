import React from 'react';
import { styled } from 'styled-components';

interface IconStyledProps {
  url?: string;
  size: 'sm' | 'md' | 'lg' | 'full';
}

const StyledIcon = styled.div<IconStyledProps>`
  background-image: url(${({ url }) => url});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center left;

  ${({ size }) =>
    size === 'full'
      ? `width: 100%; height: 100%;`
      : size === 'lg'
      ? `width: 24px; height: 24px;`
      : size === 'md'
      ? `width: 20px; height: 20px;`
      : `width: 18px; height: 18px;`}
`;

interface IconProps extends IconStyledProps {
  type: keyof typeof IconType;
  alt: string;
}

const IconType = {
  random: '../assets/ic-random.svg',
  logo: '../assets/ic-logo.svg',
  arrowDown: '../assets/ic-arrow-down.svg',
  alignLeft: '../assets/ic-align-left.svg',
  alignCenter: '../assets/ic-align-center.svg',
  alignRight: '../assets/ic-align-right.svg',
  zoomIn: '../assets/ic-zoom-in.svg',
  zoomOut: '../assets/ic-zoom-out.svg',
  desktop: '../assets/ic-desktop.svg',
  tablet: '../assets/ic-tablet.svg',
  mobile: '../assets/ic-mobile.svg',
};

const Icon = ({ type, alt, size = 'md' }: IconProps) => {
  return <StyledIcon url={IconType[type]} size={size} className={alt} />;
};

export default Icon;

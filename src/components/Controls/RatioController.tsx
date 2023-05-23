import React, { memo } from 'react';
import { styled } from 'styled-components';
import { Ratio, RatioType } from '../../@types/index.type';
import useWindowSize from '../../hooks/useWindowSize';
import { breakpoints, mediaQuery } from '../../theme/breakpoints';

const RatioContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  gap: 20px;

  ${mediaQuery.sm} {
    gap: 10px;
  }
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface RatioControllerProps {
  onClick: (ratio: RatioType) => void;
  ratio?: RatioType;
}

const DesktopIcon = ({ size, fill }: { size: number; fill: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M31.7258 9.75H9.36022C8.88441 9.75 8.5 10.1344 8.5 10.6102V23.9435C8.5 24.4194 8.88441 24.8038 9.36022 24.8038H19.5753V27.8145H14.9516C14.7151 27.8145 14.5215 28.0081 14.5215 28.2446V29.5349C14.5215 29.6532 14.6183 29.75 14.7366 29.75H26.3495C26.4677 29.75 26.5645 29.6532 26.5645 29.5349V28.2446C26.5645 28.0081 26.371 27.8145 26.1344 27.8145H21.5108V24.8038H31.7258C32.2016 24.8038 32.586 24.4194 32.586 23.9435V10.6102C32.586 10.1344 32.2016 9.75 31.7258 9.75ZM30.6505 22.8683H10.4355V11.6855H30.6505V22.8683Z"
      fill={fill}
      stroke={fill}
      strokeWidth="0.5"
    />
  </svg>
);

const TabletIcon = ({ size, fill }: { size: number; fill: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M28.6429 7.75H13.2143C12.2688 7.75 11.5 8.51875 11.5 9.46429V30.0357C11.5 30.9813 12.2688 31.75 13.2143 31.75H28.6429C29.5884 31.75 30.3572 30.9813 30.3572 30.0357V9.46429C30.3572 8.51875 29.5884 7.75 28.6429 7.75ZM28.4286 29.8214H13.4286V9.67857H28.4286V29.8214ZM19.8572 27.0357C19.8572 27.3199 19.97 27.5924 20.171 27.7933C20.3719 27.9943 20.6444 28.1071 20.9286 28.1071C21.2127 28.1071 21.4853 27.9943 21.6862 27.7933C21.8871 27.5924 22 27.3199 22 27.0357C22 26.7516 21.8871 26.479 21.6862 26.2781C21.4853 26.0772 21.2127 25.9643 20.9286 25.9643C20.6444 25.9643 20.3719 26.0772 20.171 26.2781C19.97 26.479 19.8572 26.7516 19.8572 27.0357Z"
      fill={fill}
      stroke={fill}
      strokeWidth="0.5"
    />
  </svg>
);

const MobileIcon = ({ size, fill }: { size: number; fill: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M26.6429 7.75H14.2143C13.2688 7.75 12.5 8.51875 12.5 9.46429V30.0357C12.5 30.9813 13.2688 31.75 14.2143 31.75H26.6429C27.5884 31.75 28.3571 30.9813 28.3571 30.0357V9.46429C28.3571 8.51875 27.5884 7.75 26.6429 7.75ZM26.4286 29.8214H14.4286V9.67857H26.4286V29.8214ZM19.3571 27.0893C19.3571 27.3734 19.47 27.646 19.671 27.8469C19.8719 28.0478 20.1444 28.1607 20.4286 28.1607C20.7127 28.1607 20.9853 28.0478 21.1862 27.8469C21.3871 27.646 21.5 27.3734 21.5 27.0893C21.5 26.8051 21.3871 26.5326 21.1862 26.3317C20.9853 26.1307 20.7127 26.0179 20.4286 26.0179C20.1444 26.0179 19.8719 26.1307 19.671 26.3317C19.47 26.5326 19.3571 26.8051 19.3571 27.0893Z"
      fill={fill}
      stroke={fill}
      strokeWidth="0.5"
    />
  </svg>
);

const ACTIVE_COLOR = '#000000';
const INACTIVE_COLOR = '#757575';

const RatioController = ({ ratio, onClick }: RatioControllerProps) => {
  const windowWidth = useWindowSize();
  const isMobile = windowWidth <= breakpoints.sm;

  return (
    <RatioContainer>
      <StyledButton onClick={() => onClick(Ratio.desktop)}>
        <DesktopIcon
          size={isMobile ? 24 : 28}
          fill={ratio === Ratio.desktop ? ACTIVE_COLOR : INACTIVE_COLOR}
        />
      </StyledButton>
      <StyledButton onClick={() => onClick(Ratio.tablet)}>
        <TabletIcon
          size={isMobile ? 24 : 28}
          fill={ratio === Ratio.tablet ? ACTIVE_COLOR : INACTIVE_COLOR}
        />
      </StyledButton>
      <StyledButton onClick={() => onClick(Ratio.mobile)}>
        <MobileIcon
          size={isMobile ? 24 : 28}
          fill={ratio === Ratio.mobile ? ACTIVE_COLOR : INACTIVE_COLOR}
        />
      </StyledButton>
    </RatioContainer>
  );
};

export default memo(RatioController);

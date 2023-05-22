import React, { memo } from 'react';
import { styled } from 'styled-components';
import Icon from '../Common/Icon';

const RatioContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  gap: 20px;
`;

export enum Ratio {
  DESKTOP = '16:9',
  TABLET = '4:3',
  MOBILE = '9:16',
}

interface RatioControllerProps {
  onClick: (ratio: Ratio) => void;
}

const RatioController = ({ onClick }: RatioControllerProps) => {
  return (
    <RatioContainer>
      <button onClick={() => onClick(Ratio.DESKTOP)}>
        <Icon type="desktop" alt="desktop" size="lg" />
      </button>
      <button onClick={() => onClick(Ratio.TABLET)}>
        <Icon type="tablet" alt="tablet" size="lg" />
      </button>
      <button onClick={() => onClick(Ratio.MOBILE)}>
        <Icon type="mobile" alt="mobile" size="lg" />
      </button>
    </RatioContainer>
  );
};

export default memo(RatioController);

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

const RatioController = () => {
  return (
    <RatioContainer>
      <Icon type="desktop" alt="desktop" size="lg" />
      <Icon type="tablet" alt="tablet" size="lg" />
      <Icon type="mobile" alt="mobile" size="lg" />
    </RatioContainer>
  );
};

export default memo(RatioController);

import React from 'react';
import { styled } from 'styled-components';
import { Subtitle } from '../../styles/typography';
import Icon from '../Common/Icon';

const TabBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 20px;

  padding-bottom: 30px;
  border-bottom: 1.5px dashed #eee;

  gap: 20px;

  width: 100%;
`;

const TabHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

interface TabProps {
  label: string;
  children: React.ReactNode;
  randomize?: () => void;
}

const Tab = ({ label, children, randomize }: TabProps) => {
  return (
    <TabBox>
      <TabHeader>
        <Subtitle>{label}</Subtitle>
        {randomize && <Icon type="random" size="sm" alt="random-select" />}
      </TabHeader>
      {children}
    </TabBox>
  );
};

export default Tab;

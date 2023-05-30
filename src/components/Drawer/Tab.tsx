import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Subtitle } from '../../styles/typography.styles';

const TabBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  border-bottom: 1.5px dashed ${({ theme }) => theme.colors.gray200};

  width: 100%;
  overflow: hidden;
  padding-bottom: 24px;
`;

const TabHeader = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0px 20px;
  padding-top: 24px;
  padding-bottom: 24px;

  transition: all 0.3s ease-in-out;
`;

const TabContent = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding: 0px 20px;
  gap: 20px;

  max-height: ${({ isOpen }) => (isOpen ? '500px' : '0px')};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  background-color: #ffffff;
`;

const ExpandBox = styled.div<{ isOpen: boolean }>`
  transition: transform 0.25s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(0deg)' : 'rotate(180deg)')};
`;

interface TabProps {
  label: string;
  children: React.ReactNode;
  randomize?: () => void;
}

const ExpandIcon = () => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.9673 16.665C19.7011 16.9313 19.2844 16.9555 18.9908 16.7376L18.9067 16.665L12.437 10.1957L5.96734 16.665C5.70107 16.9313 5.28441 16.9555 4.9908 16.7376L4.90668 16.665C4.64042 16.3988 4.61621 15.9821 4.83406 15.6885L4.90668 15.6044L11.9067 8.60437C12.1729 8.3381 12.5896 8.31389 12.8832 8.53175L12.9673 8.60437L19.9673 15.6044C20.2602 15.8973 20.2602 16.3721 19.9673 16.665Z"
        fill="#505050"
      />
    </svg>
  );
};

const Tab = ({ label, children, randomize }: TabProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <TabBox>
      <TabHeader
        onClick={() => {
          setIsOpen(prev => !prev);
        }}
      >
        <Subtitle>{label}</Subtitle>
        <ExpandBox isOpen={isOpen}>
          <ExpandIcon />
        </ExpandBox>
      </TabHeader>
      <TabContent isOpen={isOpen}>{children}</TabContent>
    </TabBox>
  );
};

export default Tab;

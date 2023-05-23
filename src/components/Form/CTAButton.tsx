import React from 'react';
import { styled } from 'styled-components';

const CTA = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 56px;
  border-radius: 100px;

  background: linear-gradient(90deg, #36dbd1, transparent) #896df8;
  box-shadow: 0 8px 20px 0 rgba(31, 38, 135, 0.25);
  color: ${({ theme }) => theme.colors.white};
  transition: background-color 0.5s;

  &:hover {
    background-color: #36dbd1;
  }
`;

interface CTAButtonProps {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const CTAButton = ({ label, onClick }: CTAButtonProps) => {
  return <CTA onClick={onClick}>{label}</CTA>;
};

export default CTAButton;

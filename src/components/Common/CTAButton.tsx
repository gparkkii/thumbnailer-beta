import React from 'react';
import { styled } from 'styled-components';

const CTA = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 56px;
  border-radius: 8px;

  background-color: ${({ theme }) => theme.colors.primary100};
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary200};
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

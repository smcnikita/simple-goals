import type { ButtonHTMLAttributes } from 'react';

type ButtonProps = {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md';
  isButtonError?: boolean;
};

export type Props = ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps;

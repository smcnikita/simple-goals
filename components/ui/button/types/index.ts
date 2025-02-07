import type { ButtonHTMLAttributes } from 'react';

type ButtonProps = {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md';
};

export type Props = ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps;

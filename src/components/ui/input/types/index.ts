import type { InputHTMLAttributes } from 'react';

type InputProps = {
  message?: string;
  useMessage?: boolean;
  useLabel?: boolean;

  id: string;
};

export type Props = InputHTMLAttributes<HTMLInputElement> & InputProps;

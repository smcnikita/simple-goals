import type { InputHTMLAttributes, FC, PropsWithChildren } from 'react';

type CheckboxProps = {
  id: InputHTMLAttributes<HTMLInputElement>['id'];
  name: InputHTMLAttributes<HTMLInputElement>['name'];
  disabled?: InputHTMLAttributes<HTMLInputElement>['disabled'];
  checked: boolean;

  onChange?: InputHTMLAttributes<HTMLInputElement>['onChange'];
};

export type ComponentProps = FC<PropsWithChildren<CheckboxProps>>;

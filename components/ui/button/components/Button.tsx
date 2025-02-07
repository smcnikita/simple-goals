import clsx from 'clsx';
import type { FC, PropsWithChildren } from 'react';

import type { Props } from '../types';

import classes from '../styles/button.module.css';
import classesPrimary from '../styles/primary.module.css';
import classesSecondary from '../styles/secondary.module.css';

const Button: FC<PropsWithChildren<Props>> = (props) => {
  const { children, type = 'button', className, variant = 'primary', size = 'md', ...rest } = props;

  return (
    <button
      type={type}
      className={clsx(
        classes.button,
        {
          [classesPrimary.button__primary]: variant === 'primary',
          [classesSecondary.button__secondary]: variant === 'secondary',

          [classes.button__sm]: size === 'sm',
        },
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;

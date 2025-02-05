import clsx from 'clsx';

import type { FC, PropsWithChildren } from 'react';
import type { Props } from './types';

import classes from './input.module.css';

const input: FC<PropsWithChildren<Props>> = (props) => {
  const { children, message, useLabel = true, useMessage = true, id, ...rest } = props;

  return (
    <div className={classes.group}>
      <input className={classes.field} id={id} {...rest} />
      {useLabel && (
        <label
          className={clsx(classes.label, {
            [classes.label__active]: message,
          })}
          htmlFor={id}
        >
          {children}
        </label>
      )}
      {useMessage && (
        <div
          className={clsx(classes.message, {
            [classes.active]: message,
          })}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default input;

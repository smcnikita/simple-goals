'use client';

import { RefObject, useRef, type FC, type PropsWithChildren, type ReactNode } from 'react';

import classes from '../styles/popover.module.css';
import clsx from 'clsx';
import { useOnClickOutside } from 'usehooks-ts';

type Props = {
  popover?: ReactNode;
  isShow: boolean;
  updateIsShow: (value: boolean) => void;
};

const Popover: FC<PropsWithChildren<Props>> = ({ children, popover, isShow, updateIsShow }) => {
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref as RefObject<HTMLElement>, () => {
    if (isShow) {
      updateIsShow(false);
    }
  });

  return (
    <div
      className={classes.popover}
      ref={ref}
      onKeyDown={(event) => {
        if (event.code === 'Escape' && isShow) {
          updateIsShow(false);
        }
      }}
    >
      {children}

      <div
        className={clsx(classes.content, {
          [classes.show]: isShow,
        })}
      >
        {popover}
      </div>
    </div>
  );
};

export default Popover;

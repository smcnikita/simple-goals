'use client';

import clsx from 'clsx';
import { useRef, useState, type FC, RefObject } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

import BaseIcon, { UserIcon } from '@/components/ui/icon';
import UserPopoverContent from './UserPopoverContent';

import classes from '../styles/popover.module.css';

type Props = {
  className?: string;
};

const UserPopover: FC<Props> = ({ className }) => {
  const [isShow, setIsShow] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref as RefObject<HTMLElement>, () => {
    if (isShow) {
      setIsShow(false);
    }
  });

  return (
    <div
      className={clsx(classes.popover)}
      ref={ref}
      onKeyDown={(event) => {
        if (event.code === 'Escape' && isShow) {
          setIsShow(false);
        }
      }}
    >
      <button type="button" className={className} onClick={() => setIsShow(!isShow)}>
        <BaseIcon>
          <UserIcon />
        </BaseIcon>
      </button>
      <UserPopoverContent
        className={clsx({
          [classes.show]: isShow,
        })}
      />
    </div>
  );
};

export default UserPopover;

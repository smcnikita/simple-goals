'use client';

import { useState, type FC } from 'react';

import BasePopover from '@/components/ui/popover';
import BaseIcon, { MoreGridSmallIcon } from '@/components/ui/icon';

import PopoverContent from './PopoverContent';

import classes from '../../styles/header.module.css';

type Props = {
  isAuth: boolean;
};

const Popover: FC<Props> = ({ isAuth }) => {
  const [isShow, setIsShow] = useState(false);
  const updateIsShow = (value: boolean) => setIsShow(value);

  return (
    <BasePopover isShow={isShow} updateIsShow={updateIsShow} popover={<PopoverContent isAuth={isAuth} />}>
      <button type="button" className={classes.tab} onClick={() => setIsShow(!isShow)}>
        <BaseIcon>
          <MoreGridSmallIcon />
        </BaseIcon>
      </button>
    </BasePopover>
  );
};

export default Popover;

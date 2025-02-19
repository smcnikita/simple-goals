'use client';

import { useState, type FC } from 'react';

import BaseIcon, { SunIcon } from '@/components/ui/icon';
import Popover from '@/components/ui/popover';

import Theme from './Theme';

type Props = {
  className?: string;
};

const ThemePopover: FC<Props> = ({ className }) => {
  const [isShow, setIsShow] = useState(false);
  const updateIsShow = (value: boolean) => setIsShow(value);

  return (
    <Popover isShow={isShow} updateIsShow={updateIsShow} popover={<Theme />}>
      <button type="button" className={className} onClick={() => setIsShow(!isShow)}>
        <BaseIcon>
          <SunIcon />
        </BaseIcon>
      </button>
    </Popover>
  );
};

export default ThemePopover;

'use client';

import { useState, type FC } from 'react';

import BaseIcon, { UserIcon } from '@/components/ui/icon';
import Popover from '@/components/ui/popover';

import UserPopoverContent from './UserPopoverContent';

type Props = {
  className?: string;
};

const UserPopover: FC<Props> = ({ className }) => {
  const [isShow, setIsShow] = useState(false);
  const updateIsShow = (value: boolean) => setIsShow(value);

  return (
    <Popover isShow={isShow} updateIsShow={updateIsShow} popover={<UserPopoverContent />}>
      <button type="button" className={className} onClick={() => setIsShow(!isShow)}>
        <BaseIcon>
          <UserIcon />
        </BaseIcon>
      </button>
    </Popover>
  );
};

export default UserPopover;

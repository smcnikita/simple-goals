'use client';

import { useState, type FC } from 'react';

import BaseIcon, { TranslateIcon } from '@/components/ui/icon';
import Popover from '@/components/ui/popover';

import Content from './Content';

type Props = {
  className?: string;
};

const LangPopover: FC<Props> = ({ className }) => {
  const [isShow, setIsShow] = useState(false);
  const updateIsShow = (value: boolean) => setIsShow(value);

  return (
    <Popover isShow={isShow} updateIsShow={updateIsShow} popover={<Content />}>
      <button type="button" className={className} onClick={() => setIsShow(!isShow)}>
        <BaseIcon viewBox="0 0 512 512">
          <TranslateIcon />
        </BaseIcon>
      </button>
    </Popover>
  );
};

export default LangPopover;

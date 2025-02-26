'use client';

import type { FC } from 'react';
import { useTranslations } from 'next-intl';
import { signOut } from 'next-auth/react';

import BaseIcon, { ExitIcon } from '@/components/ui/icon';

import classes from '@/components/ui/popover/styles/popover.module.css';

const LogoutActions: FC = () => {
  const t = useTranslations('Auth');

  return (
    <button type="button" className={classes.content_action} onClick={async () => await signOut()}>
      <BaseIcon>
        <ExitIcon />
      </BaseIcon>
      {t('exit')}
    </button>
  );
};

export default LogoutActions;

'use client';

import type { FC } from 'react';
import { useTranslations } from 'next-intl';

import BaseIcon, { ExitIcon } from '@/components/ui/icon';

import { logoutClient } from '@/utils/logout';

import classes from '@/components/ui/popover/styles/popover.module.css';

const LogoutActions: FC = () => {
  const t = useTranslations('Auth');
  const tErrors = useTranslations('Errors');

  return (
    <>
      <button
        type="button"
        className={classes.content_action}
        onClick={async () => await logoutClient(tErrors('something'))}
      >
        <BaseIcon>
          <ExitIcon />
        </BaseIcon>
        {t('exit')}
      </button>
    </>
  );
};

export default LogoutActions;

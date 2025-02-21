'use client';

import type { FC } from 'react';
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';

import { PATHS } from '@/constants/paths';

import { httpLogout } from '@/lib/http/auth';

import BaseIcon, { ExitIcon } from '@/components/ui/icon';

import classes from '@/components/ui/popover/styles/popover.module.css';

const LogoutActions: FC = () => {
  const t = useTranslations('Auth');
  const tErrors = useTranslations('Errors');

  const logout = async () => {
    const res = await httpLogout();

    if (!res.ok) {
      toast.error(tErrors('something'));
      return;
    }

    localStorage.removeItem('latestCSRFToken');
    window.location.href = PATHS.auth.signIn;
  };

  return (
    <>
      <button type="button" className={classes.content_action} onClick={() => logout()}>
        <BaseIcon>
          <ExitIcon />
        </BaseIcon>
        {t('exit')}
      </button>
    </>
  );
};

export default LogoutActions;

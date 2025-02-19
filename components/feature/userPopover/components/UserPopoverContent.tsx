'use client';

import type { FC } from 'react';
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';

import { PATHS } from '@/constants/paths';

import { httpLogout } from '@/lib/http/auth';

import BaseIcon, { ExitIcon } from '@/components/ui/icon';

import classes from '@/components/ui/popover/styles/popover.module.css';

type Props = {
  className?: string;
};

const UserPopoverContent: FC<Props> = ({ className }) => {
  const t = useTranslations('Auth');

  const logout = async () => {
    const res = await httpLogout();

    if (!res.ok) {
      toast.error('Something went wrong');
      return;
    }

    window.location.href = PATHS.auth.signIn;
  };

  return (
    <div className={className}>
      <div className={classes.content_wrapper}>
        <p className={classes.content_title}> {t('exit')}</p>

        <button type="button" className={classes.content_action} onClick={() => logout()}>
          <BaseIcon>
            <ExitIcon />
          </BaseIcon>
          {t('exit')}
        </button>
      </div>
    </div>
  );
};

export default UserPopoverContent;

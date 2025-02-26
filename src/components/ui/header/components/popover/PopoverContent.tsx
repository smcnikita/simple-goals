'use client';

import type { FC } from 'react';
import { useTranslations } from 'next-intl';

import LogoutActions from '@/components/feature/logoutActions';
import Theme from '@/components/feature/theme';
import Lang from '@/components/feature/lang';

import classes from './style.module.css';

type Props = {
  isAuth: boolean;
};

const PopoverContent: FC<Props> = ({ isAuth }) => {
  const t = useTranslations('Theme');
  const tAuth = useTranslations('Auth');
  const tLang = useTranslations('Lang');

  return (
    <div>
      <div className={classes.section}>
        <p className={classes.title}>{t('theme')}</p>
        <Theme />
      </div>

      <div className={classes.section}>
        <p className={classes.title}>{tLang('lang')}</p>
        <Lang />
      </div>

      {isAuth && (
        <div className={classes.section}>
          <p className={classes.title}>{tAuth('exit')}</p>
          <LogoutActions />
        </div>
      )}
    </div>
  );
};

export default PopoverContent;

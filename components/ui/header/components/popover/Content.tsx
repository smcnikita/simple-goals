'use client';

import type { FC } from 'react';

import LogoutActions from '@/components/feature/logoutActions';
import Theme from '@/components/feature/theme';
import Lang from '@/components/feature/lang';

import classes from './style.module.css';
import { useTranslations } from 'next-intl';

type Props = {
  isAuth: boolean;
};

const Content: FC<Props> = ({ isAuth }) => {
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

export default Content;

import type { FC } from 'react';
import { useTranslations } from 'next-intl';

import { PATHS } from '@/constants/paths';

import HeaderMenuItem from './HeaderMenuItem';

import classes from '../styles/header.module.css';

type Props = {
  isAuth: boolean;
};

const HeaderMenu: FC<Props> = ({ isAuth }) => {
  const t = useTranslations('NavLinks');

  const nowYear = new Date().getFullYear();

  return (
    <nav className={classes.tabs}>
      <HeaderMenuItem href={PATHS.home}>{t('home')}</HeaderMenuItem>
      {isAuth && (
        <HeaderMenuItem href={PATHS.goals.base + PATHS.goals.slug.replace(':slug', nowYear.toString())}>
          {t('goals')}
        </HeaderMenuItem>
      )}
    </nav>
  );
};

export default HeaderMenu;

'use client';

import type { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { PATHS } from '@/constants/paths';

import { showHeader } from '../utils/showHeader';

import UserPopover from '@/components/feature/userPopover';
import ThemePopover from '@/components/feature/themePopover';
import LangPopover from '@/components/feature/langPopover';

import HeaderMenu from './HeaderMenu';

import classes from '../styles/header.module.css';

type Props = {
  isAuth: boolean;
};

const Header: FC<Props> = ({ isAuth }) => {
  const pathname = usePathname();
  const isShowHeader = showHeader(pathname);
  const t = useTranslations('Auth');

  if (!isShowHeader) {
    return null;
  }

  return (
    <header className={classes.wrapper}>
      <div className={classes.header}>
        <HeaderMenu isAuth={isAuth} />
        <div className={classes.tabs}>
          <ThemePopover className={classes.tab} />
          <LangPopover className={classes.tab} />
          {isAuth ? (
            <>
              <UserPopover className={classes.tab} />
            </>
          ) : (
            <>
              <Link href={PATHS.auth.signIn} type="button" className={classes.tab}>
                {t('signIn')}
              </Link>
              {/* <Link href={PATHS.auth.signUp} type="button" className={classes.tab}>
                {t('signUp')}
              </Link> */}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

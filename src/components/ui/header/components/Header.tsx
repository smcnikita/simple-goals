'use client';

import type { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';

import { PATHS } from '@/constants/paths';

import { showHeader } from '../utils/showHeader';

import HeaderMenu from './HeaderMenu';
import BasePopover from './popover/Popover';

import classes from '../styles/header.module.css';

const Header: FC = () => {
  const pathname = usePathname();
  const isShowHeader = showHeader(pathname);
  const t = useTranslations('Auth');

  const { data: session } = useSession();
  const isAuth = !!session;

  if (!isShowHeader) {
    return null;
  }

  return (
    <header className={classes.wrapper}>
      <div className={classes.header}>
        <HeaderMenu isAuth={isAuth} />
        <div className={classes.tabs}>
          <BasePopover isAuth={isAuth} />
          {!isAuth && (
            <>
              <Link href={PATHS.auth.signIn} type="button" className={classes.tab}>
                {t('signIn')}
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

'use client';

import type { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import toast from 'react-hot-toast';

import { PATHS } from '@/constants/paths';

import { httpLogout } from '@/lib/http/auth';

import { showHeader } from '../utils/showHeader';

import HeaderMenu from './HeaderMenu';
import ThemeComponent from '@/components/feature/theme';

import BaseIcon, { ExitIcon } from '@/components/ui/icon';

import classes from '../styles/header.module.css';

type Props = {
  isAuth: boolean;
};

const Header: FC<Props> = ({ isAuth }) => {
  const pathname = usePathname();
  const isShowHeader = showHeader(pathname);

  if (!isShowHeader) {
    return null;
  }

  const logout = async () => {
    const res = await httpLogout();

    if (!res.ok) {
      toast.error('Something went wrong');
      return;
    }

    window.location.href = PATHS.auth.signIn;
  };

  return (
    <header className={classes.wrapper}>
      <div className={classes.header}>
        <HeaderMenu isAuth={isAuth} />
        <div className={classes.tabs}>
          <ThemeComponent />
          {isAuth ? (
            <button type="button" className={classes.tab} onClick={() => logout()}>
              <BaseIcon color="white">
                <ExitIcon />
              </BaseIcon>
            </button>
          ) : (
            <>
              <Link href={PATHS.auth.signIn} type="button" className={classes.tab}>
                Sign In
              </Link>
              <Link href={PATHS.auth.signUp} type="button" className={classes.tab}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

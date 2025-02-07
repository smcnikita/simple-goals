'use client';

import type { FC } from 'react';
import { usePathname } from 'next/navigation';

import { showHeader } from '../utils/showHeader';

import HeaderMenu from './HeaderMenu';

import classes from '../styles/header.module.css';

const Header: FC = () => {
  const pathname = usePathname();
  const isShowHeader = showHeader(pathname);

  if (!isShowHeader) {
    return null;
  }

  return (
    <header className={classes.wrapper}>
      <div className={classes.header}>
        <HeaderMenu />
        <div>
          <button type="button" className={classes.tab}>
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

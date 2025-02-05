'use client';

import { usePathname } from 'next/navigation';
import type { FC } from 'react';

import { showHeader } from './utils/showHeader';

import classes from './header.module.css';

const Header: FC = () => {
  const pathname = usePathname();
  const isShowHeader = showHeader(pathname);

  if (!isShowHeader) {
    return null;
  }

  return (
    <header className={classes.wrapper}>
      <div className={classes.header}>
        <div>header</div>
        <div>header 2</div>
      </div>
    </header>
  );
};

export default Header;

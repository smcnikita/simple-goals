'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, type FC, type PropsWithChildren } from 'react';

import { PATHS } from '@/constants/paths';

import classes from '../styles/header.module.css';

type Props = {
  href: string;
};

const HeaderMenuItem: FC<PropsWithChildren<Props>> = ({ children, href }) => {
  const pathname = usePathname();

  const active = useMemo<boolean>(() => {
    return pathname.includes(PATHS.goals.base) ? href.includes(PATHS.goals.base) : pathname === href;
  }, [href, pathname]);

  return (
    <Link
      href={href}
      className={clsx(classes.tab, {
        [classes.tab__active]: active,
      })}
    >
      {children}
    </Link>
  );
};

export default HeaderMenuItem;

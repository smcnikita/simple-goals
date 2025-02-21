'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useMemo, type FC, type PropsWithChildren } from 'react';

import { PATHS } from '@/constants/paths';

import classes from '../styles/item.module.css';

type Props = {
  year: number;
};

const AsideItem: FC<PropsWithChildren<Props>> = ({ year }) => {
  const pathname = usePathname();

  const href = useMemo(() => {
    return PATHS.goals.base + PATHS.goals.slug.replace(':slug', year.toString());
  }, [year]);

  return (
    <li className={classes.item}>
      <Link
        href={href}
        className={clsx(classes.link, {
          [classes.active]: pathname === href,
        })}
      >
        {year}
      </Link>
    </li>
  );
};

export default AsideItem;

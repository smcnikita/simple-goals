import clsx from 'clsx';
import Link from 'next/link';
import { type FC, type PropsWithChildren } from 'react';

import classes from '../styles/item.module.css';

type Props = {
  value: string;
  isActive: boolean;
  href: string;
  className?: string;
};

const AsideItem: FC<PropsWithChildren<Props>> = ({ value, href, className, isActive }) => {
  return (
    <li className={classes.item}>
      <Link
        href={href}
        className={clsx(classes.link, className, {
          [classes.active]: isActive,
        })}
      >
        {value}
      </Link>
    </li>
  );
};

export default AsideItem;

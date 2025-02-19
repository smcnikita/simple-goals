import type { FC, PropsWithChildren } from 'react';
import Link from 'next/link';

import { PATHS } from '@/constants/paths';

import classes from './page.module.css';

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={classes.layout}>
      <div className={classes.container}>
        <Link href={PATHS.home} className={classes.title}>
          Simple Goals
        </Link>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;

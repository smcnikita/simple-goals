import type { FC, PropsWithChildren } from 'react';

import classes from './page.module.css';

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={classes.layout}>
      <div className={classes.container}>
        <h2 className={classes.title}>Simple Goals</h2>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;

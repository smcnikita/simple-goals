import type { FC, PropsWithChildren } from 'react';

import classes from '../styles/container.module.css';

const Container: FC<PropsWithChildren> = ({ children }) => {
  return <div className={classes.container}>{children}</div>;
};

export default Container;

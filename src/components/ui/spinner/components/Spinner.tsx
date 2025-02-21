import type { FC } from 'react';

import classes from '../styles/spinner.module.css';

const Spinner: FC = () => {
  return <div className={classes.loader} />;
};

export default Spinner;

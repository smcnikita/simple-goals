import { type FC } from 'react';

import AsideList from './AsideList';

import classes from '../styles/aside.module.css';

const Aside: FC = () => {
  const currentYear = new Date().getFullYear();
  const years = [currentYear];

  return (
    <aside className={classes.aside} id="aside">
      <nav>
        <AsideList defaultYears={years} />
      </nav>
    </aside>
  );
};

export default Aside;

import type { FC } from 'react';

import type { YearItem } from '@/types/years';

import AsideList from './AsideList';

import classes from '../styles/aside.module.css';

type Props = {
  years: YearItem[];
};

const Aside: FC<Props> = ({ years }) => {
  return (
    <aside className={classes.aside}>
      <nav>
        <AsideList years={years} />
      </nav>
    </aside>
  );
};

export default Aside;

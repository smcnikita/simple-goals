import type { FC } from 'react';

import type { YearItem } from '@/types/years';

import AsideItem from './AsideItem';

import classes from '../styles/list.module.css';

type Props = {
  years: YearItem[];
};

const AsideList: FC<Props> = ({ years }) => {
  return (
    <ul className={classes.list}>
      {years.map((year) => (
        <AsideItem key={year.id} year={year.year} />
      ))}
    </ul>
  );
};

export default AsideList;

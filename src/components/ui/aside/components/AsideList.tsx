'use client';

import { useEffect, type FC } from 'react';

import { LOCAL_STORAGE_YEARS_KEY } from '@/constants/localstorage';

import Spinner from '@/components/ui/spinner';

import AsideItem from './AsideItem';

import classes from '../styles/list.module.css';
import useAside from '../hooks/useAside';

type Props = {
  defaultYears: number[];
};

const AsideList: FC<Props> = ({ defaultYears }) => {
  const { years, isLoading, fetchYears, updateYears } = useAside(defaultYears);

  useEffect(() => {
    const savedYears = localStorage.getItem(LOCAL_STORAGE_YEARS_KEY);

    if (savedYears) {
      updateYears(JSON.parse(savedYears));
    }

    fetchYears();
  }, [defaultYears, fetchYears, updateYears]);

  return (
    <ul className={classes.list}>
      {years.map((year) => (
        <AsideItem key={year} year={year} />
      ))}

      {isLoading && (
        <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', opacity: 0.1 }}>
          <Spinner />
        </div>
      )}
    </ul>
  );
};

export default AsideList;

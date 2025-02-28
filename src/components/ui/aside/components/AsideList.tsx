'use client';

import { Fragment, useEffect, type FC } from 'react';

import { LOCAL_STORAGE_YEARS_KEY } from '@/constants/localstorage';

import useAside from '../hooks/useAside';

import Spinner from '@/components/ui/spinner';

import AsideItem from './AsideItem';

import { useTranslations } from 'next-intl';

import cl from '../styles/list.module.css';
import cl_item from '../styles/item.module.css';

type Props = {
  defaultYears: number[];
};

const AsideList: FC<Props> = ({ defaultYears }) => {
  const { years, isLoading, selectedYear, fetchYears, updateYears } = useAside(defaultYears);

  const t = useTranslations('Months');

  useEffect(() => {
    const savedYears = localStorage.getItem(LOCAL_STORAGE_YEARS_KEY);

    if (savedYears) {
      updateYears(JSON.parse(savedYears));
    }

    fetchYears();
  }, [defaultYears, fetchYears, updateYears]);

  return (
    <ul className={cl.list}>
      {years.map((year) => (
        <Fragment key={year.year}>
          <AsideItem
            value={year.year.toString()}
            href={`/goals/${year.year}`}
            isActive={year.year === selectedYear.year && selectedYear.month === null}
          />
          {year.months &&
            year.months.map((month) => (
              <AsideItem
                key={month}
                value={t(month)}
                href={`/goals/${year.year}/${month}`}
                isActive={month === selectedYear.month}
                className={cl_item.item__small}
              />
            ))}
        </Fragment>
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

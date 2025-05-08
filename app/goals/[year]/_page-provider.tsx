'use client';

import { useEffect, type FC, type PropsWithChildren } from 'react';

import { STATUS_TOTAL } from '@/constants/statuses';

import { useFilterStatusStore } from '@/stores/filter-status-store';
import { useStatusStore } from '@/stores/status-store';

import type { Statuses } from '@/types/statuses.types';

type Props = {
  statuses: Statuses;
};

const PageProvider: FC<PropsWithChildren<Props>> = ({ children, statuses }) => {
  const { updateStatusOptions } = useStatusStore();
  const { updateFilterStatusOptions } = useFilterStatusStore();

  useEffect(() => {
    const statusOptions = statuses.map((status) => ({
      key: status.key,
      name: status.name,
    }));

    const filterStatusOptions = [
      {
        key: STATUS_TOTAL.key,
        name: STATUS_TOTAL.name,
      },
      ...statusOptions,
    ];

    updateStatusOptions(statusOptions);
    updateFilterStatusOptions(filterStatusOptions);
  }, [statuses, updateStatusOptions, updateFilterStatusOptions]);

  return <>{children}</>;
};

export default PageProvider;

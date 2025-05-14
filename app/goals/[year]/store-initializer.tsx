'use client';

import { useEffect, useMemo, type FC, type PropsWithChildren } from 'react';

import { STATUS_TOTAL } from '@/constants/statuses';

import { useFilterStatusStore } from '@/stores/filter-status-store';
import { useStatusStore } from '@/stores/status-store';

import type { Statuses } from '@/types/statuses.types';

type Props = {
  statuses: Statuses;
};

const StoreInitializer: FC<PropsWithChildren<Props>> = ({ children, statuses }) => {
  const { updateStatusOptions } = useStatusStore();
  const { updateFilterStatusOptions } = useFilterStatusStore();

  const statusOptions = useMemo(() => statuses.map(({ key }) => ({ key })), [statuses]);

  const filterStatusOptions = useMemo(() => [{ key: STATUS_TOTAL.key }, ...statusOptions], [statusOptions]);

  useEffect(() => {
    updateStatusOptions(statusOptions);
    updateFilterStatusOptions(filterStatusOptions);
  }, [statusOptions, filterStatusOptions, updateStatusOptions, updateFilterStatusOptions]);

  return children;
};

export default StoreInitializer;

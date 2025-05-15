'use client';

import { useEffect, useMemo, type FC, type PropsWithChildren } from 'react';

import { STATUS_OPTION_TOTAL } from '@/constants/status';

import { useFilterStatusStore } from '@/stores/filter-status-store';
import { useStatusStore } from '@/stores/status-store';

import type { StatusModel, StatusOption, FilterStatusOption } from '@/types/status.types';

type Props = {
  statuses: StatusModel[];
};

const StoreInitializer: FC<PropsWithChildren<Props>> = ({ children, statuses }) => {
  const { updateStatusOptions } = useStatusStore();
  const { updateFilterStatusOptions } = useFilterStatusStore();

  const statusOptions = useMemo<StatusOption[]>(() => statuses.map(({ key }) => ({ key })), [statuses]);

  const filterStatusOptions = useMemo<FilterStatusOption[]>(
    () => [{ key: STATUS_OPTION_TOTAL.key }, ...statusOptions],
    [statusOptions]
  );

  useEffect(() => {
    updateStatusOptions(statusOptions);
    updateFilterStatusOptions(filterStatusOptions);
  }, [statusOptions, filterStatusOptions, updateStatusOptions, updateFilterStatusOptions]);

  return children;
};

export default StoreInitializer;

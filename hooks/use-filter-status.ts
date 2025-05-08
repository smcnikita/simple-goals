import { useState } from 'react';

import { STATUS_TOTAL } from '@/constants/statuses';

import type { StatusDBKeys, StatusKeys } from '@/types/statuses.types';
import type { Statuses } from '@/types/statuses.types';

const useFilterStatus = (statuses: Statuses) => {
  const filterOptions: Statuses = [STATUS_TOTAL, ...statuses];

  const [selectedFilter, setSelectedFilter] = useState<StatusKeys>(STATUS_TOTAL.key);

  const updateSelectedStatus = (value: StatusDBKeys) => {
    setSelectedFilter(value);
  };

  return { selectedFilter, filterOptions, updateSelectedStatus };
};

export default useFilterStatus;

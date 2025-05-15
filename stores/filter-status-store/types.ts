import type { FilterStatusKeys, FilterStatusOption } from '@/types/status.types';

export type Store = {
  selectedFilterStatus: FilterStatusKeys;
  filterStatusOptions: FilterStatusOption[];
  updateSelectedFilterStatus: (value: FilterStatusKeys) => void;
  updateFilterStatusOptions: (value: FilterStatusOption[]) => void;
};

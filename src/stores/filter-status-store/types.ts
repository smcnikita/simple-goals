import type { FilterStatusKeys, FilterStatusOption } from '@/types/status/status';

export type Store = {
  selectedFilterStatus: FilterStatusKeys;
  filterStatusOptions: FilterStatusOption[];
  updateSelectedFilterStatus: (value: FilterStatusKeys) => void;
  updateFilterStatusOptions: (value: FilterStatusOption[]) => void;
};

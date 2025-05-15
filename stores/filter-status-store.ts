import { create } from 'zustand';

import { STATUS_OPTION_TOTAL } from '@/constants/status';

import type { FilterStatusKeys, FilterStatusOption } from '@/types/status.types';

type Store = {
  selectedFilterStatus: FilterStatusKeys;
  filterStatusOptions: FilterStatusOption[];
  updateSelectedFilterStatus: (value: FilterStatusKeys) => void;
  updateFilterStatusOptions: (value: FilterStatusOption[]) => void;
};

export const useFilterStatusStore = create<Store>()((set) => ({
  selectedFilterStatus: STATUS_OPTION_TOTAL.key,
  filterStatusOptions: [],
  updateSelectedFilterStatus: (value) => set(() => ({ selectedFilterStatus: value })),
  updateFilterStatusOptions: (value) => set(() => ({ filterStatusOptions: value })),
}));

import { create } from 'zustand';

import { STATUS_TOTAL } from '@/constants/statuses';

import type { StatusKeys, StatusOptionItem } from '@/types/statuses.types';

type Store = {
  selectedFilterStatus: StatusKeys;
  filterStatusOptions: StatusOptionItem[];
  updateSelectedFilterStatus: (value: StatusKeys) => void;
  updateFilterStatusOptions: (value: StatusOptionItem[]) => void;
};

export const useFilterStatusStore = create<Store>()((set) => ({
  selectedFilterStatus: STATUS_TOTAL.key,
  filterStatusOptions: [],
  updateSelectedFilterStatus: (value) => set(() => ({ selectedFilterStatus: value })),
  updateFilterStatusOptions: (value) => set(() => ({ filterStatusOptions: value })),
}));

import { create } from 'zustand';

import { STATUS_OPTION_TOTAL } from '@/constants/status';

import type { Store } from './types';

const DEFAULT_SELECTED_FILTER = STATUS_OPTION_TOTAL.key;

export const useFilterStatusStore = create<Store>()((set) => ({
  selectedFilterStatus: DEFAULT_SELECTED_FILTER,
  filterStatusOptions: [],
  updateSelectedFilterStatus: (value) => set(() => ({ selectedFilterStatus: value })),
  updateFilterStatusOptions: (value) => set(() => ({ filterStatusOptions: value })),
}));

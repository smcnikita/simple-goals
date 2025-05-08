import { create } from 'zustand';

import type { StatusOptionItem } from '@/types/statuses.types';

type Store = {
  statusOptions: StatusOptionItem[];
  updateStatusOptions: (value: StatusOptionItem[]) => void;
};

export const useStatusStore = create<Store>()((set) => ({
  statusOptions: [],
  updateStatusOptions: (value) => set(() => ({ statusOptions: value })),
}));

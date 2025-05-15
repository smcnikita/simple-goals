import { create } from 'zustand';

import type { StatusOption } from '@/types/status.types';

type Store = {
  statusOptions: StatusOption[];
  updateStatusOptions: (value: StatusOption[]) => void;
};

export const useStatusStore = create<Store>()((set) => ({
  statusOptions: [],
  updateStatusOptions: (value) => set(() => ({ statusOptions: value })),
}));

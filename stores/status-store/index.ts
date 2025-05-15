import { create } from 'zustand';

import type { Store } from './types';

export const useStatusStore = create<Store>()((set) => ({
  statusOptions: [],
  updateStatusOptions: (value) => set(() => ({ statusOptions: value })),
}));

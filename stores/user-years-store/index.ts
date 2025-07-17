import { create } from 'zustand';

import { httpCreateNext } from '@/lib/api/years';

import type { Store } from './types';

export const useUserYearsStore = create<Store>()((set) => ({
  isLoadingCreateNextYear: false,
  userYears: [],
  updateUserYears: (value) => set(() => ({ userYears: value.sort((a, b) => b - a) })),
  createNextYear: async () => {
    set({ isLoadingCreateNextYear: true });

    const res = await httpCreateNext();

    set((state) => ({
      userYears: [res.data.data.year, ...state.userYears].sort((a, b) => b - a),
      isLoadingCreateNextYear: false,
    }));
  },
}));

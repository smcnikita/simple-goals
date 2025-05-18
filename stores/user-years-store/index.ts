import { create } from 'zustand';

import { httpCreateNextYear } from '@/lib/http/create-next-year.http';

import type { Store } from './types';

export const useUserYearsStore = create<Store>()((set) => ({
  isLoadingCreateNextYear: false,
  userYears: [],
  updateUserYears: (value) => set(() => ({ userYears: value.sort((a, b) => b - a) })),
  createNextYear: async () => {
    set({ isLoadingCreateNextYear: true });

    const res = await httpCreateNextYear();

    set((state) => ({
      userYears: [res.data.year, ...state.userYears].sort((a, b) => b - a),
      isLoadingCreateNextYear: false,
    }));
  },
}));

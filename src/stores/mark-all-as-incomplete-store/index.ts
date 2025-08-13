import { create } from 'zustand';

import { httpMarkAllIncomplete } from '@/lib/api/goals';

import type { Store } from './types';

export const markAllAsIncompleteStore = create<Store>()((set) => ({
  isLoading: false,
  markAllAsIncomplete: async (year: number) => {
    set({
      isLoading: true,
    });

    try {
      const res = await httpMarkAllIncomplete(year);

      return res.data;
    } finally {
      set({ isLoading: false });
    }
  },
}));

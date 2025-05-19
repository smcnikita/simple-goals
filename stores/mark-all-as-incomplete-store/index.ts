import { create } from 'zustand';

import { httpMarkAllAsIncomplete } from '@/lib/http/markAllGoalsAsIncomplete.http';

import type { Store } from './types';

export const markAllAsIncompleteStore = create<Store>()((set) => ({
  isLoading: false,
  markAllAsIncomplete: async (year: number) => {
    set({
      isLoading: true,
    });

    try {
      const res = await httpMarkAllAsIncomplete(year);

      return res.data;
    } finally {
      set({ isLoading: false });
    }
  },
}));

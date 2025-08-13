import { create } from 'zustand';

import type { Store } from './types';

export const useThemeStore = create<Store>()((set) => ({
  theme: 'system',
  updateTheme: (value) => {
    set(() => ({ theme: value }));

    if (value === 'system') {
      localStorage.removeItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      if (prefersDark) {
        document.documentElement.classList.add('dark');
      }
      return;
    }

    localStorage.theme = value;
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(value);
  },
}));

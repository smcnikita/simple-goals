import type { Theme } from '@/types/theme.types';

export type Store = {
  theme: Theme;
  updateTheme: (value: Theme) => void;
};

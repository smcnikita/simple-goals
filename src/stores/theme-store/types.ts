import type { Theme } from '@/types/theme/theme';

export type Store = {
  theme: Theme;
  updateTheme: (value: Theme) => void;
};

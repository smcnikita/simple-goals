import type { MarkAllAsIncompleteResponse } from '@/app/api/goals/mark-all-incomplete/types';

export type Store = {
  isLoading: boolean;
  markAllAsIncomplete: (year: number) => Promise<MarkAllAsIncompleteResponse['data']>;
};

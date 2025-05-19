import type { GoalModelWithStatus } from '@/types/goals.types';

export type MarkAllAsIncompleteResponse = {
  data: GoalModelWithStatus[];
};

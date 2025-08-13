import type { GoalModelWithStatus } from '@/types/goals/goal';

export type MarkAllAsIncompleteResponse = {
  data: GoalModelWithStatus[];
};

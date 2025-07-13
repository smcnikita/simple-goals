import * as goalsService from '@/services/goals';

import type { MarkAllAsIncompleteResponse } from '@/app/api/goals/mark-all-incomplete/types';

export const markAllAsIncomplete = async (
  userId: number,
  yearId: number
): Promise<MarkAllAsIncompleteResponse['data']> => {
  return await goalsService.markAllAsIncomplete(userId, yearId);
};

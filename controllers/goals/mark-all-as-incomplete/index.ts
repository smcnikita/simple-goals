import { goalsService } from '@/services/goals/goals.service';

import type { MarkAllAsIncompleteResponse } from '@/app/api/goals/mark-all-incomplete/types';

export const markAllAsIncomplete = async (
  userId: number,
  yearId: number
): Promise<MarkAllAsIncompleteResponse['data']> => {
  return await goalsService.markAllAsIncomplete(userId, yearId);
};

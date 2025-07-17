import * as goalsService from '@/services/goals';

export const exportGoals = async (userId: number) => {
  return await goalsService.exportGoals(userId);
};

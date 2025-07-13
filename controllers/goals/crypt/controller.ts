import * as goalsService from '@/services/goals';

export const encryptGoals = async (userId: number) => {
  return await goalsService.cryptGoals(userId, true);
};

export const decryptGoals = async (userId: number) => {
  return await goalsService.cryptGoals(userId, false);
};

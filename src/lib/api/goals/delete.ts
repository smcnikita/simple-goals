import { API_PATHS } from '@/constants/api-paths';

import { fetchFromAPI } from '@/lib/http';

import type { GoalModel } from '@/types/goals/goal';

type HttpDeleteGoalParams = {
  id: number;
  year: number;
};

type DeleteGoalResponse = {
  message: string;
  data: GoalModel;
};

export const httpDeleteGoal = async ({ id, year }: HttpDeleteGoalParams) => {
  const apiUrl = API_PATHS.GOALS.DELETE_GOAL;
  const body = JSON.stringify({ id, year });
  return fetchFromAPI<DeleteGoalResponse>(apiUrl, { method: 'DELETE', body });
};

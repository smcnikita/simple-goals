import { GoalModel } from '@/types/goals.types';

import { API_PATHS } from '@/constants/api-paths';

import { fetchFromAPI } from '@/lib/http';

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

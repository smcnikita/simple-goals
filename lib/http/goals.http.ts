import { API_PATHS } from '@/constants/api-paths';

import { fetchFromAPI } from '@/lib/http';
import { GoalsWithStatus } from '@/types/goals.types';

type GetGoalsResponse = {
  data: {
    goals: GoalsWithStatus;
  };
};

export const httpGetGoal = async (year: number) => {
  const queryParams = new URLSearchParams({ year: year.toString() });
  const apiUrl = `${API_PATHS.GOALS.GET}?${queryParams.toString()}`;

  return fetchFromAPI<GetGoalsResponse>(apiUrl, { method: 'GET' });
};

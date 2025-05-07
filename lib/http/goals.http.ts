import { API_PATHS } from '@/constants/api-paths';

import { fetchFromAPI } from '@/lib/http';

import type { GoalsWithStatus, GoalsWithStatusItem } from '@/types/goals.types';

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

type HttpCreateGoalParams = {
  name: string;
  description?: string;
  status: string;
  year: number;
};

type CreateGoalResponse = {
  data: GoalsWithStatusItem;
};

export const httpCreateGoal = async ({ name, description, status, year }: HttpCreateGoalParams) => {
  const apiUrl = API_PATHS.GOALS.CREATE_GOAL;
  const body = JSON.stringify({
    year,
    name: name.trim(),
    description: description ?? undefined,
    status,
  });
  return fetchFromAPI<CreateGoalResponse>(apiUrl, { method: 'POST', body });
};

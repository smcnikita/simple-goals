import { GoalModel } from '@/types/goals.types';

import { API_PATHS } from '@/constants/api-paths';

import { fetchFromAPI } from '@/lib/http';

import type { GoalModelWithStatus } from '@/types/goals.types';
import type { DescriptionSettings } from '@/types/description-settings.type';

type GetGoalsResponse = {
  data: {
    goals: GoalModelWithStatus[];
    can_edit_past_goals: boolean;
    show_statistic: boolean;
    description_settings: DescriptionSettings;
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
  data: GoalModelWithStatus;
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

type HttpUpdateGoalParams = {
  id: number;
  name: string;
  description?: string;
  status: string;
  year: number;
};

type UpdateGoalResponse = {
  data: GoalModelWithStatus;
};

export const httpUpdateGoal = async ({ id, name, description, status, year }: HttpUpdateGoalParams) => {
  const apiUrl = API_PATHS.GOALS.UPDATE_GOAL;
  const body = JSON.stringify({
    id,
    year,
    name: name.trim(),
    description: description ?? undefined,
    status,
  });
  return fetchFromAPI<UpdateGoalResponse>(apiUrl, { method: 'PUT', body });
};

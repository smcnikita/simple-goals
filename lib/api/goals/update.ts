import { API_PATHS } from '@/constants/api-paths';

import { fetchFromAPI } from '@/lib/http';

import type { GoalModelWithStatus } from '@/types/goals.types';

type HttpUpdateGoalParams = {
  id: number;
  name: string;
  description?: string;
  status: string;
  year: number;
  section_id: number | null;
};

type UpdateGoalResponse = {
  data: GoalModelWithStatus;
};

export const httpUpdateGoal = async ({ id, name, description, status, year, section_id }: HttpUpdateGoalParams) => {
  const apiUrl = API_PATHS.GOALS.UPDATE_GOAL;
  const body = JSON.stringify({
    id,
    year,
    name: name.trim(),
    description: description ?? undefined,
    status,
    section_id,
  });
  return fetchFromAPI<UpdateGoalResponse>(apiUrl, { method: 'PUT', body });
};

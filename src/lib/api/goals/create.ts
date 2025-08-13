import { API_PATHS } from '@/constants/api-paths';

import { fetchFromAPI } from '@/lib/http';

import type { GoalModelWithStatus } from '@/types/goals/goal';

type HttpCreateGoalParams = {
  name: string;
  description?: string;
  status: string;
  year: number;
  section_id: number | null;
};

type CreateGoalResponse = {
  data: GoalModelWithStatus;
};

export const httpCreateGoal = async ({ name, description, status, year, section_id }: HttpCreateGoalParams) => {
  const apiUrl = API_PATHS.GOALS.CREATE_GOAL;
  const body = JSON.stringify({
    year,
    name: name.trim(),
    description: description ?? undefined,
    status,
    section_id,
  });
  return fetchFromAPI<CreateGoalResponse>(apiUrl, { method: 'POST', body });
};

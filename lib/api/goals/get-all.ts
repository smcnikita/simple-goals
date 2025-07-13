import { fetchFromAPI } from '@/lib/http';

import { API_PATHS } from '@/constants/api-paths';

import type { GoalModelWithStatus } from '@/types/goals/goal';
import type { DescriptionSettings } from '@/types/settings/description';

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

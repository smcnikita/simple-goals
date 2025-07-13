import { fetchFromAPI } from '@/lib/http';

import { API_PATHS } from '@/constants/api-paths';

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

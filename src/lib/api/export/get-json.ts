import { fetchFromAPI } from '@/lib/http';

import { API_PATHS } from '@/constants/api-paths';

import type { NextResponseTypeItem } from '@/lib/responses/createSuccessResponse';
import type { ExportGoals } from '@/services/goals';

export const httpExportGetJson = async () => {
  const apiUrl = API_PATHS.EXPORT_GOALS;
  return fetchFromAPI<NextResponseTypeItem<ExportGoals>>(apiUrl);
};

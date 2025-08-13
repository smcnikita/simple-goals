import { API_PATHS } from '@/constants/api-paths';

import { fetchFromAPI } from '@/lib/http';

import type { Section } from '@prisma/client';

type GetSectionsResponse = {
  data: {
    sections: Section[];
  };
};

export const httpGetSections = async (year: number) => {
  const queryParams = new URLSearchParams({ year: year.toString() });
  const apiUrl = `${API_PATHS.SECTIONS.GET}?${queryParams.toString()}`;

  return fetchFromAPI<GetSectionsResponse>(apiUrl, { method: 'GET' });
};

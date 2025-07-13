import { API_PATHS } from '@/constants/api-paths';

import { fetchFromAPI } from '@/lib/http';

type DeleteSectionParams = {
  sectionId: number;
  year: number;
};

type DeleteSectionResponse = {
  data: {
    sectionId: number;
  };
};

export const httpDeleteSection = async ({ sectionId, year }: DeleteSectionParams) => {
  const apiUrl = API_PATHS.SECTIONS.DELETE_SECTION;
  const body = JSON.stringify({ sectionId, year });
  return fetchFromAPI<DeleteSectionResponse>(apiUrl, { method: 'DELETE', body });
};

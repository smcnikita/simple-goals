import { API_PATHS } from '@/constants/api-paths';

import { fetchFromAPI } from '@/lib/http';

import type { Section } from '@prisma/client';

type UpdateSectionParams = {
  sectionId: number;
  name: string;
  year: number;
};

type UpdateSectionResponse = {
  data: {
    section: Section;
  };
};

export const httpUpdateSection = async ({ sectionId, name, year }: UpdateSectionParams) => {
  const apiUrl = API_PATHS.SECTIONS.UPDATE_SECTION;
  const body = JSON.stringify({ sectionId, name, year });
  return fetchFromAPI<UpdateSectionResponse>(apiUrl, { method: 'PUT', body });
};

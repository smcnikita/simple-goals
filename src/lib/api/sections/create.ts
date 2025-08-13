import { API_PATHS } from '@/constants/api-paths';

import { fetchFromAPI } from '@/lib/http';

import type { Section } from '@prisma/client';

type CreateSectionParams = {
  year: number;
  name: string;
};

type CreateSectionResponse = {
  data: {
    section: Section;
  };
};

export const httpCreateSection = async ({ year, name }: CreateSectionParams) => {
  const apiUrl = API_PATHS.SECTIONS.CREATE_SECTION;
  const body = JSON.stringify({ year, name });
  return fetchFromAPI<CreateSectionResponse>(apiUrl, { method: 'POST', body });
};

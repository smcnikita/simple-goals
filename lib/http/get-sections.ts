import { API_PATHS } from '@/constants/api-paths';

import { fetchFromAPI } from '@/lib/http';

import { Section } from '@prisma/client';

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

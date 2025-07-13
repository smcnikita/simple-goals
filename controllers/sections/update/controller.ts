import * as sectionsService from '@/services/sections';

type Params = {
  userId: number;
  yearId: number;
  sectionId: number;
  name: string;
};

export const updateSection = async (params: Params) => {
  return await sectionsService.updateSection(params);
};

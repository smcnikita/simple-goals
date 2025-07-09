import { sectionsService } from '@/services/sections/sections.service';

type Params = {
  userId: number;
  yearId: number;
  sectionId: number;
  name: string;
};

export const updateSection = async (params: Params) => {
  return await sectionsService.updateSection(params);
};

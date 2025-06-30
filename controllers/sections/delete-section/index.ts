import { sectionsService } from '@/services/sections/sections.service';

type Params = {
  userId: number;
  yearId: number;
  sectionId: number;
};

export const deleteSection = async (params: Params) => {
  return await sectionsService.deleteSection(params);
};

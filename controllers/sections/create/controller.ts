import { sectionsService } from '@/services/sections/sections.service';

type Params = {
  userId: number;
  yearId: number;
  name: string;
};

export const createSection = async (params: Params) => {
  return await sectionsService.createSection(params);
};

import { yearsService } from '@/services/years/years.service';

export const findOrCreate = async (userId: number) => {
  return await yearsService.findOrCreate({ userId });
};

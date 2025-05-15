import { yearsService } from '@/services/years/years-service';

export const findByUserId = async (userId: number) => {
  return await yearsService.findYearsByUserId({ userId });
};

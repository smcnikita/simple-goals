import * as yearsService from '@/services/years';

export const findByUserId = async (userId: number) => {
  return await yearsService.findYearsByUserId({ userId });
};

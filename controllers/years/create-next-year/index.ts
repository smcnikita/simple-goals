import { yearsService } from '@/services/years/years.service';

import type { CreateNextYearResponse } from './types';

export const createNextYear = async (userId: number): CreateNextYearResponse => {
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  const isYearExist = await yearsService.findYear(userId, nextYear);

  if (isYearExist) {
    return {
      error: 'Next year already exists',
    };
  }

  return await yearsService.createUserYear({
    userId,
    year: nextYear,
  });
};

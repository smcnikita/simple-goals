import { prisma } from '@/lib/prisma';

import { yearsService } from '@/services/years-service';

export const yearsController = {
  createYear: async (userId: number, year: number) => {
    return await prisma.years.create({
      data: { user_id: userId, year },
    });
  },

  getUserYearsFromDatabase: async (userId: number) => {
    return await prisma.years.findMany({ where: { user_id: userId } });
  },

  getUserYearsFormatted: async (userId: number) => {
    const existingYears = await yearsController.getUserYearsFromDatabase(userId);

    return await yearsService.getFormattedYears({ userId, existingYears });
  },

  getYearByName: async (userId: number, year: number) => {
    return await prisma.years.findFirst({ where: { user_id: userId, year } });
  },
};

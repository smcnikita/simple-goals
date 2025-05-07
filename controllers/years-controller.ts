import { prisma } from '@/lib/prisma';
import { getUserYears } from '@/services/years-service';

type GetYearsParams = {
  userId: number;
};

type GetYearByNameParams = {
  userId: number;
  year: number;
};

export const yearsController = {
  getYears: async ({ userId }: GetYearsParams) => {
    const years = await getUserYears({ userId });

    return years;
  },

  getYearByName: async ({ userId, year }: GetYearByNameParams) => {
    return await prisma.years.findFirst({
      where: {
        user_id: userId,
        year,
      },
    });
  },
};

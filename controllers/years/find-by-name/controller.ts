import { prisma } from '@/lib/prisma/prisma';

export const getYearByName = async (userId: number, year: number) => {
  return await prisma.years.findFirst({
    where: {
      user_id: userId,
      year,
    },
  });
};

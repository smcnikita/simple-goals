import { prisma } from '@/lib/prisma';

export const getSections = async (userId: number, yearId: number) => {
  const year = await prisma.years.findFirst({
    where: {
      id: yearId,
      user_id: userId,
    },
  });

  if (!year) {
    return [];
  }

  return await prisma.section.findMany({
    where: {
      years_id: yearId,
    },
  });
};

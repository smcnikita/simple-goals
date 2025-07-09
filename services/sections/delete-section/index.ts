import { prisma } from '@/lib/prisma';

type Params = {
  userId: number;
  yearId: number;
  sectionId: number;
};

export const deleteSection = async ({ userId, yearId, sectionId }: Params) => {
  const year = await prisma.years.findFirst({
    where: {
      id: yearId,
      user_id: userId,
    },
  });

  if (!year) {
    throw new Error('Year not found');
  }

  return await prisma.section.deleteMany({
    where: {
      id: sectionId,
      years_id: yearId,
    },
  });
};

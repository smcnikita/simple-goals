import { prisma } from '@/lib/prisma';

type Params = {
  userId: number;
  yearId: number;
  sectionId: number;
  name: string;
};

export const updateSection = async ({ userId, yearId, sectionId, name }: Params) => {
  const year = await prisma.years.findFirst({
    where: {
      id: yearId,
      user_id: userId,
    },
  });

  if (!year) {
    throw new Error('Year not found');
  }

  return await prisma.section.update({
    where: {
      id: sectionId,
    },
    data: {
      name,
    },
  });
};

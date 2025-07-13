import { prisma } from '@/lib/prisma';

type CreateParams = {
  userId: number;
  yearId: number;
  name: string;
};

export const createSection = async ({ name, userId, yearId }: CreateParams) => {
  const year = await prisma.years.findFirst({
    where: {
      id: yearId,
      user_id: userId,
    },
  });

  if (!year) {
    throw new Error('Year not found');
  }

  return await prisma.section.create({
    data: {
      name,
      years_id: yearId,
    },
  });
};

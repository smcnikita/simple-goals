import { PrismaClient } from '@prisma/client/extension';

export const createStatisticsCount = async (prisma: PrismaClient) => {
  const countExist = await prisma.statistics.findFirst({
    where: { id: 1 },
  });

  if (countExist) {
    console.log('-> Statistics count already exist');
    return;
  }

  await prisma.statistics.create({
    data: { id: 1, count: 0 },
  });

  console.log('-> Statistics count created');
};

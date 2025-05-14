import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createStatuses = async () => {
  let statuses = await prisma.statuses.findMany();

  const inProgressStatus = statuses.find((el) => el.key === 'in_progress');

  if (!inProgressStatus) {
    await prisma.statuses.create({ data: { key: 'in_progress' } });
    console.log('-> The status "In Progress" has been created');
  }

  const canceledStatus = statuses.find((el) => el.key === 'canceled');

  if (!canceledStatus) {
    await prisma.statuses.create({ data: { key: 'canceled' } });
    console.log('-> The status "Canceled" has been created');
  }

  const completedStatus = statuses.find((el) => el.key === 'completed');

  if (!completedStatus) {
    await prisma.statuses.create({ data: { key: 'completed' } });
    console.log('-> The status "Completed" has been created');
  }

  const notCompletedStatus = statuses.find((el) => el.key === 'not_completed');

  if (!notCompletedStatus) {
    await prisma.statuses.create({ data: { key: 'not_completed' } });
    console.log('-> The status "Not Completed" has been created');
  }

  statuses = await prisma.statuses.findMany();

  if (statuses.length !== 4) {
    throw Error('-> Error: Expected 4 statuses');
  }

  console.log('-> Done: Statuses have been created');
};

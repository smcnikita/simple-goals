import { PrismaClient } from '@prisma/client';

import { STATUS } from '@/constants/statuses';

const prisma = new PrismaClient();

export const createStatuses = async () => {
  let statuses = await prisma.statuses.findMany();

  const inProgressStatus = statuses.find((el) => el.key === STATUS.InProgress);

  if (!inProgressStatus) {
    await prisma.statuses.create({ data: { key: STATUS.InProgress } });
    console.log('-> The status "In Progress" has been created');
  }

  const canceledStatus = statuses.find((el) => el.key === STATUS.Canceled);

  if (!canceledStatus) {
    await prisma.statuses.create({ data: { key: STATUS.Canceled } });
    console.log('-> The status "Canceled" has been created');
  }

  const completedStatus = statuses.find((el) => el.key === STATUS.Completed);

  if (!completedStatus) {
    await prisma.statuses.create({ data: { key: STATUS.Completed } });
    console.log('-> The status "Completed" has been created');
  }

  const notCompletedStatus = statuses.find((el) => el.key === STATUS.NotCompleted);

  if (!notCompletedStatus) {
    await prisma.statuses.create({ data: { key: STATUS.NotCompleted } });
    console.log('-> The status "Not Completed" has been created');
  }

  statuses = await prisma.statuses.findMany();

  if (statuses.length !== 4) {
    throw Error('-> Error: Expected 4 statuses');
  }

  console.log('-> Done: Statuses have been created');
};

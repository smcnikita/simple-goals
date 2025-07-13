import { prisma } from '@/lib/prisma/prisma';

import type { StatusKeys } from '@/types/status.types';
import type { MarkAllAsIncompleteResponse } from '@/app/api/goals/mark-all-incomplete/types';

type ServiceResponse = Promise<MarkAllAsIncompleteResponse['data']>;

export const markAllAsIncomplete = async (userId: number, yearId: number): ServiceResponse => {
  const statuses = await prisma.statuses.findMany();

  if (!statuses) {
    throw new Error('Failed to fetch statuses');
  }

  const notCompletedStatus = statuses.find((status) => status.key === 'not_completed');
  const inProgressStatus = statuses.find((status) => status.key === 'in_progress');

  if (!notCompletedStatus || !inProgressStatus) {
    throw new Error('Required statuses not found');
  }

  const goalsToUpdate = await prisma.goals.findMany({
    where: {
      user_id: userId,
      year_id: yearId,
      status_id: inProgressStatus.id,
    },
  });

  if (goalsToUpdate.length === 0) {
    return [];
  }

  await prisma.goals.updateMany({
    data: {
      status_id: notCompletedStatus.id,
    },
    where: {
      id: { in: goalsToUpdate.map((goal) => goal.id) },
    },
  });

  return goalsToUpdate.map((goal) => ({
    ...goal,
    status: notCompletedStatus.key as StatusKeys,
    status_id: notCompletedStatus.id,
  }));
};

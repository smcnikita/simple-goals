import { prisma } from '@/lib/prisma';

import type { GetUserGoalsParams } from './types';

export const getUserGoals = async ({ userId, yearId }: GetUserGoalsParams) => {
  const userGoals = await prisma.goals.findMany({
    where: {
      user_id: userId,
      year_id: yearId,
    },
    orderBy: [
      {
        created_at: 'asc',
      },
    ],
  });

  const statusItems = await prisma.statuses.findMany();
  const statusMap = new Map(statusItems.map((status) => [status.id, status.key]));

  return userGoals.map((goal) => ({
    ...goal,
    status: statusMap.get(goal.status_id) ?? null,
  }));
};

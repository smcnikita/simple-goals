import { prisma } from '@/lib/prisma';

import type { CreateGoalParams } from './types';

export async function createGoal(params: CreateGoalParams) {
  const { name, description, statusId, userId, yearId } = params;

  return await prisma.goals.create({
    data: {
      name: name.trim(),
      description,
      status_id: statusId,
      user_id: userId,
      year_id: yearId,
    },
  });
}

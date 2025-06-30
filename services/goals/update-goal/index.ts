import { prisma } from '@/lib/prisma';

import type { UpdateGoalParams } from './types';

export async function updateGoal(params: UpdateGoalParams) {
  const { id, name, description, statusId, userId, yearId, section_id } = params;

  return await prisma.goals.update({
    data: {
      name: name.trim(),
      description,
      status_id: statusId,
      section_id,
    },
    where: {
      id: id,
      user_id: userId,
      year_id: yearId,
    },
  });
}

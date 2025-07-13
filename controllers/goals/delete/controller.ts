import { prisma } from '@/lib/prisma/prisma';

import type { DeleteGoalsParams } from './types';

export const deleteGoal = async (params: DeleteGoalsParams) => {
  const { id, userId } = params;

  return await prisma.goals.delete({
    where: { id, user_id: userId },
  });
};

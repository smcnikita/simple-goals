import { prisma } from '@/lib/prisma';

import { goalsService } from '@/services/goals/goals-service';

import type { StatusKeys } from '@/types/status.types';
import type { UpdateGoalParams } from './types';

export const updateGoal = async (params: UpdateGoalParams) => {
  const { id, name, description, statusKey, userId, yearId } = params;

  const statusModel = await prisma.statuses.findFirst({
    where: {
      key: statusKey,
    },
  });

  if (!statusModel) {
    return null;
  }

  return {
    data: await goalsService.updateGoal({
      id,
      description,
      name,
      statusId: statusModel.id,
      userId,
      yearId,
    }),
    status: statusModel.key as StatusKeys,
  };
};

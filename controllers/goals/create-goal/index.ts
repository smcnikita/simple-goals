import { prisma } from '@/lib/prisma';

import { goalsService } from '@/services/goals/goals.service';

import type { StatusKeys } from '@/types/status.types';
import type { CreateGoalParams } from './types';

export const createGoal = async (params: CreateGoalParams) => {
  const { name, description, statusKey, userId, yearId, year, canEditPastGoals } = params;

  const statusModel = await prisma.statuses.findFirst({
    where: {
      key: statusKey,
    },
  });

  if (!statusModel) {
    return null;
  }

  const nowYear = new Date().getFullYear();

  if (nowYear === year || canEditPastGoals) {
    return {
      data: await goalsService.createGoal({
        description,
        name,
        statusId: statusModel.id,
        userId,
        yearId,
      }),
      status: statusModel.key as StatusKeys,
    };
  }

  return {
    error: 'You cannot edit goals for this year',
  };
};

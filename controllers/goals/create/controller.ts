import { prisma } from '@/lib/prisma/prisma';

import * as goalsService from '@/services/goals';

import type { CreateGoalParams } from './types';

import type { StatusKeys } from '@/types/status/status';
import { STATUS_KEYS } from '@/constants/status';

export const createGoal = async (params: CreateGoalParams) => {
  const { name, description, statusKey, userId, yearId, year, canEditPastGoals, section_id } = params;

  const statusModel = await prisma.statuses.findFirst({
    where: { key: statusKey },
  });

  if (!statusModel) {
    return null;
  }

  const nowYear = new Date().getFullYear();

  let completedAt: Date | string | null = null;

  if (statusModel.key === STATUS_KEYS.Completed) {
    completedAt = new Date();
  }

  if (nowYear === year || canEditPastGoals) {
    return {
      data: await goalsService.createGoal({
        description,
        name,
        statusId: statusModel.id,
        userId,
        yearId,
        section_id,
        completedAt,
      }),
      status: statusModel.key as StatusKeys,
    };
  }

  return {
    error: 'You cannot edit goals for this year',
  };
};

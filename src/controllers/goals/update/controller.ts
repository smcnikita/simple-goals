import { prisma } from '@/lib/prisma/prisma';

import * as goalsService from '@/services/goals';

import type { UpdateParams } from './types';

import type { StatusKeys } from '@/types/status/status';
import { STATUS_KEYS } from '@/constants/status';

export const updateGoal = async (params: UpdateParams) => {
  const { id, name, description, statusKey, userId, yearId, section_id } = params;

  const statusModel = await prisma.statuses.findFirst({
    where: {
      key: statusKey,
    },
  });

  if (!statusModel) {
    return null;
  }

  let completedAt: Date | string | null = null;

  if (statusModel.key === STATUS_KEYS.Completed) {
    completedAt = new Date();
  }

  return {
    data: await goalsService.updateGoal({
      id,
      description: description ? description.trim() : null,
      name: name.trim(),
      statusId: statusModel.id,
      userId,
      yearId,
      section_id,
      completedAt,
    }),
    status: statusModel.key as StatusKeys,
  };
};

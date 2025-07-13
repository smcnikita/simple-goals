import { prisma } from '@/lib/prisma';

import { goalsService } from '@/services/goals/goals.service';

import type { UpdateParams } from './types';

import type { StatusKeys } from '@/types/status.types';

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

  return {
    data: await goalsService.updateGoal({
      id,
      description: description ? description.trim() : null,
      name: name.trim(),
      statusId: statusModel.id,
      userId,
      yearId,
      section_id,
    }),
    status: statusModel.key as StatusKeys,
  };
};

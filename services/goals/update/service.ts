import { prisma } from '@/lib/prisma/prisma';

import type { UpdateParams } from './types';

export async function updateGoal(params: UpdateParams) {
  const { id, name, description, statusId, userId, yearId, section_id, completedAt } = params;

  if (section_id) {
    const section = await prisma.section.findFirst({
      where: {
        id: section_id,
        years_id: yearId,
      },
    });

    if (!section) {
      throw new Error('Section not found');
    }
  }

  return await prisma.goals.update({
    data: {
      name: name.trim(),
      description,
      status_id: statusId,
      section_id,
      completed_at: completedAt,
    },
    where: {
      id: id,
      user_id: userId,
      year_id: yearId,
    },
  });
}

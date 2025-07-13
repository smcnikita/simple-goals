import { prisma } from '@/lib/prisma';

import type { CreateParams } from './types';

export async function createGoal(params: CreateParams) {
  const { name, description, statusId, userId, yearId, section_id } = params;

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

  return await prisma.goals.create({
    data: {
      name: name.trim(),
      description,
      status_id: statusId,
      user_id: userId,
      year_id: yearId,
      section_id,
    },
  });
}

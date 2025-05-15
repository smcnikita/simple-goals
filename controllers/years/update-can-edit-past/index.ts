import { prisma } from '@/lib/prisma';

import type { UpdateCanEditPastParams } from './types';

export const updateCanEditPast = async ({ id, userId, isCurrentCanEditPast }: UpdateCanEditPastParams) => {
  return await prisma.years.update({
    where: { id, user_id: userId },
    data: {
      can_edit_past: !isCurrentCanEditPast,
    },
  });
};

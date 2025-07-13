import { prisma } from '@/lib/prisma';

import type { UpdateShowStatParams } from './types';

export const updateShowStatistic = async ({ id, userId, isCurrentShowStatistic }: UpdateShowStatParams) => {
  return await prisma.years.update({
    where: { id, user_id: userId },
    data: {
      show_statistic: !isCurrentShowStatistic,
    },
  });
};

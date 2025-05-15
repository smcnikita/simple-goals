import { prisma } from '@/lib/prisma';

import type { UpdateShowStatisticParams } from './types';

export const updateShowStatistic = async ({ id, userId, isCurrentShowStatistic }: UpdateShowStatisticParams) => {
  return await prisma.years.update({
    where: { id, user_id: userId },
    data: {
      show_statistic: !isCurrentShowStatistic,
    },
  });
};

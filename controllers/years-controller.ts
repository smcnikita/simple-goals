import { prisma } from '@/lib/prisma';

import { getUserYears, onlyGetUserYears } from '@/services/years-service';

type GetYearsParams = {
  userId: number;
};

type GetYearByNameParams = {
  userId: number;
  year: number;
};

type UpdateShowStatisticParams = {
  id: number;
  userId: number;
  isCurrentShowStatistic: boolean;
};

type UpdateCanEditPastParams = {
  id: number;
  userId: number;
  isCurrentCanEditPast: boolean;
};

export const yearsController = {
  getYears: async ({ userId }: GetYearsParams) => {
    const years = await getUserYears({ userId });

    return years;
  },

  onlyGetYears: async ({ userId }: GetYearsParams) => {
    const years = await onlyGetUserYears({ userId });

    return years;
  },

  getYearByName: async ({ userId, year }: GetYearByNameParams) => {
    return await prisma.years.findFirst({
      where: {
        user_id: userId,
        year,
      },
    });
  },

  updateShowStatistic: async ({ id, userId, isCurrentShowStatistic }: UpdateShowStatisticParams) => {
    return await prisma.years.update({
      where: { id, user_id: userId },
      data: {
        show_statistic: !isCurrentShowStatistic,
      },
    });
  },

  updateCanEditPast: async ({ id, userId, isCurrentCanEditPast }: UpdateCanEditPastParams) => {
    return await prisma.years.update({
      where: { id, user_id: userId },
      data: {
        can_edit_past: !isCurrentCanEditPast,
      },
    });
  },
};

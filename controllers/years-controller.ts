import { getUserYears } from '@/services/years-service';

type GetYearsParams = {
  userId: number;
};

export const yearsController = {
  getYears: async ({ userId }: GetYearsParams) => {
    const years = await getUserYears({ userId });

    return years;
  },
};

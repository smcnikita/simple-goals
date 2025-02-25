import { YearModel } from '@/models/years-model';
import type { YearItem } from '@/types/years';

type GetFormattedYearsParams = {
  existingYears: YearModel[];
};

export const yearsService = {
  getFormattedYears: async ({ existingYears }: GetFormattedYearsParams): Promise<YearItem[]> => {
    const years: YearItem[] = existingYears.map((year) => {
      return { id: year.id, year: year.year };
    });

    years.sort((a, b) => b.year - a.year);

    return years;
  },
};

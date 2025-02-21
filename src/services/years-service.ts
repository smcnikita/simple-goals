import { YearModel } from '@/models/years-model';
import { yearsController } from '@/controllers/years-controller';
import type { YearItem } from '@/types/years';

type GetFormattedYearsParams = {
  userId: number;
  existingYears: YearModel[];
};

export const yearsService = {
  getFormattedYears: async ({ userId, existingYears }: GetFormattedYearsParams): Promise<YearItem[]> => {
    const currentYear = new Date().getFullYear();
    let hasCurrentYear = false;

    const years: YearItem[] = existingYears.map((year) => {
      if (year.year === currentYear) {
        hasCurrentYear = true;
      }
      return { id: year.id, year: year.year };
    });

    if (!hasCurrentYear) {
      const newYear = await yearsController.createYear(userId, currentYear);
      years.push({ id: newYear.id, year: currentYear });
    }

    years.sort((a, b) => b.year - a.year);

    return years;
  },
};

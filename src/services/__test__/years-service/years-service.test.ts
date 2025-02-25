import { yearsService } from '@/services/years-service';

import type { YearModel } from '@/models/years-model';
import { YearItem } from '@/types/years';

jest.mock('@/controllers/years-controller', () => ({
  yearsController: {
    createYear: jest.fn(),
  },
}));

describe('yearsService.getFormattedYears', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return sorted years in descending order', async () => {
    const mockYears: YearModel[] = [
      { id: 1, year: 2020, user_id: 1 },
      { id: 2, year: 2019, user_id: 1 },
      { id: 3, year: 2021, user_id: 1 },
    ];

    const expected: YearItem[] = [
      { id: 3, year: 2021 },
      { id: 1, year: 2020 },
      { id: 2, year: 2019 },
    ];

    const result = await yearsService.getFormattedYears({ existingYears: mockYears });
    expect(result).toEqual(expected);
  });

  it('should return an empty array if input is empty', async () => {
    const mockYears: YearModel[] = [];

    const result = await yearsService.getFormattedYears({ existingYears: mockYears });
    expect(result).toEqual([]);
  });

  it('should handle single year correctly', async () => {
    const mockYears: YearModel[] = [{ id: 1, year: 2020, user_id: 1 }];
    const expected: YearItem[] = [{ id: 1, year: 2020 }];

    const result = await yearsService.getFormattedYears({ existingYears: mockYears });
    expect(result).toEqual(expected);
  });
});

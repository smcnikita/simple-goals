import { yearsController } from '@/controllers/years-controller';

import { yearsService } from '@/services/years-service';

import type { YearModel } from '@/models/years-model';

jest.mock('@/controllers/years-controller', () => ({
  yearsController: {
    createYear: jest.fn(),
  },
}));

const mockUserId = 1;
const currentYear = new Date().getFullYear();

describe('yearsService.getFormattedYears', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return formatted years when current year is present', async () => {
    const existingYears: YearModel[] = [
      { id: 1, user_id: mockUserId, year: currentYear - 1 },
      { id: 2, user_id: mockUserId, year: currentYear },
    ];

    const result = await yearsService.getFormattedYears({ userId: mockUserId, existingYears });

    expect(yearsController.createYear).not.toHaveBeenCalled();
    expect(result).toEqual([
      { id: 2, year: currentYear },
      { id: 1, year: currentYear - 1 },
    ]);
  });

  it('should add current year when it is missing', async () => {
    const existingYears: YearModel[] = [{ id: 1, user_id: mockUserId, year: currentYear - 1 }];
    const newYear = { id: 3, user_id: mockUserId, year: currentYear };

    (yearsController.createYear as jest.Mock).mockResolvedValue(newYear);

    const result = await yearsService.getFormattedYears({ userId: mockUserId, existingYears });

    expect(yearsController.createYear).toHaveBeenCalledWith(mockUserId, currentYear);
    expect(result).toEqual([
      { id: 3, year: currentYear },
      { id: 1, year: currentYear - 1 },
    ]);
  });

  it('should return only current year if no existing years are provided', async () => {
    const newYear = { id: 1, user_id: mockUserId, year: currentYear };

    (yearsController.createYear as jest.Mock).mockResolvedValue(newYear);

    const result = await yearsService.getFormattedYears({ userId: mockUserId, existingYears: [] });

    expect(yearsController.createYear).toHaveBeenCalledWith(mockUserId, currentYear);
    expect(result).toEqual([{ id: 1, year: currentYear }]);
  });

  it('should return sorted years in descending order', async () => {
    const existingYears: YearModel[] = [
      { id: 2, user_id: mockUserId, year: currentYear - 2 },
      { id: 3, user_id: mockUserId, year: currentYear - 1 },
    ];
    const newYear = { id: 4, user_id: mockUserId, year: currentYear };

    (yearsController.createYear as jest.Mock).mockResolvedValue(newYear);

    const result = await yearsService.getFormattedYears({ userId: mockUserId, existingYears });

    expect(yearsController.createYear).toHaveBeenCalledWith(mockUserId, currentYear);
    expect(result).toEqual([
      { id: 4, year: currentYear },
      { id: 3, year: currentYear - 1 },
      { id: 2, year: currentYear - 2 },
    ]);
  });
});

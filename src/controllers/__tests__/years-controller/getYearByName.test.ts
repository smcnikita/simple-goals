import { prisma } from '@/lib/prisma';

import { yearsController } from '../../years-controller';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    years: {
      findFirst: jest.fn(),
    },
  },
}));

const mockUserId = 1;
const mockYear = 2024;
const mockYears = [{ id: 1, user_id: mockUserId, year: mockYear }];

const mockFindFirst = prisma.years.findFirst as jest.Mock;

describe('getYearByName', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should find a year by userId and year', async () => {
    mockFindFirst.mockResolvedValue(mockYears[0]);

    const result = await yearsController.getYearByName(mockUserId, mockYear);

    expect(mockFindFirst).toHaveBeenCalledWith({ where: { user_id: mockUserId, year: mockYear } });
    expect(result).toEqual(mockYears[0]);
  });

  it('should throw an error if Prisma call fails', async () => {
    mockFindFirst.mockRejectedValue(new Error('Database error'));
    await expect(yearsController.getYearByName(mockUserId, mockYear)).rejects.toThrow('Database error');
  });
});

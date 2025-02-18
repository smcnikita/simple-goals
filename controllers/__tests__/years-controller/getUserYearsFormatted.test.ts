import { prisma } from '@/lib/prisma';

import { yearsController } from '../../years-controller';

import { yearsService } from '@/services/years-service';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    years: {
      findMany: jest.fn(),
    },
  },
}));

jest.mock('@/services/years-service', () => ({
  yearsService: {
    getFormattedYears: jest.fn(),
  },
}));

const mockUserId = 1;
const mockYear = 2024;
const mockYears = [{ id: 1, user_id: mockUserId, year: mockYear }];

const mockFindMany = prisma.years.findMany as jest.Mock;
const mockGetFormattedYears = yearsService.getFormattedYears as jest.Mock;

describe('getUserYearsFormatted', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get formatted user years using yearsService', async () => {
    mockFindMany.mockResolvedValue(mockYears);
    mockGetFormattedYears.mockResolvedValue(['Formatted Year']);

    const result = await yearsController.getUserYearsFormatted(mockUserId);

    expect(mockFindMany).toHaveBeenCalledWith({ where: { user_id: mockUserId } });
    expect(mockGetFormattedYears).toHaveBeenCalledWith({
      userId: mockUserId,
      existingYears: mockYears,
    });
    expect(result).toEqual(['Formatted Year']);
  });

  it('should throw an error if Prisma call fails', async () => {
    mockFindMany.mockRejectedValue(new Error('Database error'));
    await expect(yearsController.getUserYearsFormatted(mockUserId)).rejects.toThrow('Database error');
  });
});

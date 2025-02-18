import { prisma } from '@/lib/prisma';

import { yearsController } from '../../years-controller';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    years: {
      findMany: jest.fn(),
    },
  },
}));

const mockUserId = 1;
const mockYear = 2024;
const mockYears = [{ id: 1, user_id: mockUserId, year: mockYear }];

const mockFindMany = prisma.years.findMany as jest.Mock;

describe('getUserYearsFromDatabase', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch user years from the database', async () => {
    mockFindMany.mockResolvedValue(mockYears);

    const result = await yearsController.getUserYearsFromDatabase(mockUserId);

    expect(mockFindMany).toHaveBeenCalledWith({ where: { user_id: mockUserId } });
    expect(result).toEqual(mockYears);
  });

  it('should throw an error if Prisma call fails', async () => {
    mockFindMany.mockRejectedValue(new Error('Database error'));
    await expect(yearsController.getUserYearsFromDatabase(mockUserId)).rejects.toThrow('Database error');
  });
});

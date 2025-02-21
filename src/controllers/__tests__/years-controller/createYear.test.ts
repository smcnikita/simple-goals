import { prisma } from '@/lib/prisma';

import { yearsController } from '../../years-controller';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    years: {
      create: jest.fn(),
    },
  },
}));

const mockUserId = 1;
const mockYear = 2024;
const mockYears = [{ id: 1, user_id: mockUserId, year: mockYear }];

const mockCreate = prisma.years.create as jest.Mock;

describe('createYear', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new year in the database', async () => {
    mockCreate.mockResolvedValue(mockYears[0]);

    const result = await yearsController.createYear(mockUserId, mockYear);

    expect(mockCreate).toHaveBeenCalledWith({
      data: { user_id: mockUserId, year: mockYear },
    });
    expect(result).toEqual(mockYears[0]);
  });

  it('should throw an error if Prisma call fails', async () => {
    mockCreate.mockRejectedValue(new Error('Database error'));
    await expect(yearsController.createYear(mockUserId, mockYear)).rejects.toThrow('Database error');
  });
});

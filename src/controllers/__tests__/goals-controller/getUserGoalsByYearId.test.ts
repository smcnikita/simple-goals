import { prisma } from '@/lib/prisma';

import { goalsController } from '@/controllers/goals-controller';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    goals: {
      update: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

const mockFindMany = prisma.goals.findMany as jest.Mock;

describe('getUserGoalsByYearId', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return goals sorted by sort_order for the given yearId', async () => {
    const userId = 1;
    const yearId = 2025;
    const mockGoals = [
      { id: 1, name: 'Goal 1', year_id: yearId, user_id: userId },
      { id: 2, name: 'Goal 2', year_id: yearId, user_id: userId },
    ];

    mockFindMany.mockResolvedValue(mockGoals);

    const result = await goalsController.getUserGoalsByYearId(yearId, userId);

    expect(mockFindMany).toHaveBeenCalledWith({
      where: { year_id: yearId, user_id: userId },
      orderBy: { created_at: 'asc' },
    });
    expect(result).toEqual(mockGoals);
  });

  it('should return an empty array if no goals are found', async () => {
    mockFindMany.mockResolvedValue([]);

    const result = await goalsController.getUserGoalsByYearId(2025, 1);

    expect(mockFindMany).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
  });

  it('should throw an error if Prisma call fails', async () => {
    mockFindMany.mockRejectedValue(new Error('Database error'));

    await expect(goalsController.getUserGoalsByYearId(2025, 1)).rejects.toThrow('Database error');
  });
});

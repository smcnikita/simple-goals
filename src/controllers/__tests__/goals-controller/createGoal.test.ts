import { prisma } from '@/lib/prisma';

import { goalsController } from '@/controllers/goals-controller';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    goals: {
      findFirst: jest.fn(),
      create: jest.fn(),
    },
    statistics: {
      update: jest.fn(),
    },
  },
}));

const mockFindFirst = prisma.goals.findFirst as jest.Mock;
const mockCreate = prisma.goals.create as jest.Mock;
const mockUpdateCount = prisma.statistics.update as jest.Mock;

describe('createGoal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error if Prisma call fails', async () => {
    mockFindFirst.mockRejectedValue(new Error('Database error'));
    mockCreate.mockRejectedValue(new Error('Database error'));
    mockUpdateCount.mockRejectedValue(new Error('Database error'));

    await expect(goalsController.createGoal({ name: 'name', year_id: 1, user_id: 1 })).rejects.toThrow(
      'Database error'
    );
    await expect(goalsController.createGoal({ name: 'name', year_id: 1, user_id: 1 })).rejects.toThrow(
      'Database error'
    );
    await expect(goalsController.createGoal({ name: 'name', year_id: 1, user_id: 1 })).rejects.toThrow(
      'Database error'
    );
  });
});

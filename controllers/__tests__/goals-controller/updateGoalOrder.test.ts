import { prisma } from '@/lib/prisma';

import { goalsController } from '@/controllers/goals-controller';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    goals: {
      update: jest.fn(),
    },
  },
}));

const mockUpdate = prisma.goals.update as jest.Mock;
const mockGoalId = 1;
const mockSortOrder = 1;

describe('updateGoalOrder', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update the sort order of the goal', async () => {
    const mockUpdatedGoal = {
      id: mockGoalId,
      is_completed: false,
      completed_at: null,
      year_id: 1,
      sort_order: mockSortOrder,
    };

    mockUpdate.mockResolvedValue(mockUpdatedGoal);

    const result = await goalsController.updateGoalOrder(mockGoalId, mockSortOrder);

    expect(mockUpdate).toHaveBeenCalledWith({
      where: {
        id: mockGoalId,
      },
      data: {
        sort_order: mockSortOrder,
      },
    });

    console.log(result);

    expect(result).toEqual(mockUpdatedGoal);
  });

  it('should throw an error if Prisma call fails', async () => {
    mockUpdate.mockRejectedValue(new Error('Database error'));

    await expect(goalsController.updateGoalOrder(mockGoalId, mockSortOrder)).rejects.toThrow('Database error');
  });
});

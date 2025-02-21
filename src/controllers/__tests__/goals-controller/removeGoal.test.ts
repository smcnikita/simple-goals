import { prisma } from '@/lib/prisma';

import { goalsController } from '@/controllers/goals-controller';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    goals: {
      delete: jest.fn(),
    },
  },
}));

const mockDelete = prisma.goals.delete as jest.Mock;

describe('goals-controller: removeGoal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should delete the goal with the given id and year_id', async () => {
    const mockGoalId = 1;
    const mockYearId = 2023;
    const mockDeletedGoal = {
      id: mockGoalId,
      year_id: mockYearId,
      is_completed: false,
      completed_at: null,
    };

    mockDelete.mockResolvedValue(mockDeletedGoal);

    const result = await goalsController.removeGoal(mockGoalId, mockYearId);

    expect(mockDelete).toHaveBeenCalledWith({
      where: {
        id: mockGoalId,
        year_id: mockYearId,
      },
    });

    expect(result).toEqual(mockDeletedGoal);
  });

  it('should throw an error if the goal does not exist', async () => {
    const mockGoalId = 999;
    const mockYearId = 2023;

    mockDelete.mockRejectedValue(new Error('Goal not found'));

    await expect(goalsController.removeGoal(mockGoalId, mockYearId)).rejects.toThrow('Goal not found');

    expect(mockDelete).toHaveBeenCalledWith({
      where: {
        id: mockGoalId,
        year_id: mockYearId,
      },
    });
  });

  it('should throw an error if Prisma call fails', async () => {
    mockDelete.mockRejectedValue(new Error('Database error'));

    await expect(goalsController.removeGoal(1, 1)).rejects.toThrow('Database error');
  });
});

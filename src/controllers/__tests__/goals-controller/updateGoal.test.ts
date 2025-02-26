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

describe('updateGoal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update the goal with the given id and year_id, setting is_completed and completed_at', async () => {
    const mockGoalId = 1;
    const mockIsCompleted = true;
    const mockYearId = 2023;
    const mockUpdatedGoal = {
      id: mockGoalId,
      is_completed: mockIsCompleted,
      completed_at: new Date(),
      year_id: mockYearId,
    };

    mockUpdate.mockResolvedValue(mockUpdatedGoal);

    const result = await goalsController.updateGoal(mockGoalId, mockIsCompleted, mockYearId, 1);

    expect(mockUpdate).toHaveBeenCalledWith({
      where: {
        id: mockGoalId,
        year_id: mockYearId,
        user_id: 1,
      },
      data: {
        is_completed: mockIsCompleted,
        completed_at: expect.any(Date),
      },
    });

    expect(result).toEqual(mockUpdatedGoal);
  });

  it('should set completed_at to null if isCompleted is false', async () => {
    const mockGoalId = 1;
    const mockIsCompleted = false;
    const mockYearId = 2023;
    const mockUpdatedGoal = {
      id: mockGoalId,
      is_completed: mockIsCompleted,
      completed_at: null,
      year_id: mockYearId,
    };

    mockUpdate.mockResolvedValue(mockUpdatedGoal);

    const result = await goalsController.updateGoal(mockGoalId, mockIsCompleted, mockYearId, 1);

    expect(mockUpdate).toHaveBeenCalledWith({
      where: {
        id: mockGoalId,
        year_id: mockYearId,
        user_id: 1,
      },
      data: {
        is_completed: mockIsCompleted,
        completed_at: null,
      },
    });

    expect(result).toEqual(mockUpdatedGoal);
  });

  it('should throw an error if Prisma call fails', async () => {
    mockUpdate.mockRejectedValue(new Error('Database error'));

    await expect(goalsController.updateGoal(1, true, 1, 1)).rejects.toThrow('Database error');
  });
});

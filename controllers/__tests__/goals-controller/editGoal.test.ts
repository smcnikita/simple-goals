import { prisma } from '@/lib/prisma';

import { goalsController } from '@/controllers/goals-controller';

// Мокируем модуль @/lib/prisma
jest.mock('@/lib/prisma', () => ({
  prisma: {
    goals: {
      update: jest.fn(),
    },
  },
}));

const mockUpdate = prisma.goals.update as jest.Mock;

describe('editGoal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update the goal with the given id and name', async () => {
    const mockGoalId = 1;
    const mockName = 'Updated Goal';

    const mockUpdatedGoal = {
      id: mockGoalId,
      name: mockName,
      year_id: 2023,
      is_completed: false,
      completed_at: null,
      sort_order: 0,
      created_at: new Date(),
      updated_at: new Date(),
    };

    mockUpdate.mockResolvedValue(mockUpdatedGoal);

    const result = await goalsController.editGoal(mockGoalId, mockName);

    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id: mockGoalId },
      data: { name: mockName },
    });

    expect(result).toEqual(mockUpdatedGoal);
  });

  it('should throw an error if Prisma call fails', async () => {
    mockUpdate.mockRejectedValue(new Error('Database error'));

    await expect(goalsController.editGoal(1, 'Test')).rejects.toThrow('Database error');
  });
});

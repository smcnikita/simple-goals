import { prisma } from '@/lib/prisma';

import { goalsController } from '@/controllers/goals-controller';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    goals: {
      findFirst: jest.fn(),
      create: jest.fn(),
    },
  },
}));

const mockFindFirst = prisma.goals.findFirst as jest.Mock;
const mockCreate = prisma.goals.create as jest.Mock;

describe('createGoal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new goal with sort_order incremented from the last goal', async () => {
    const mockName = 'New Goal';
    const mockYearId = 2023;
    const mockLastGoal = { sort_order: 5 };
    const mockCreatedGoal = {
      id: 1,
      name: mockName,
      year_id: mockYearId,
      is_completed: false,
      completed_at: null,
      sort_order: 6,
      created_at: new Date(),
      updated_at: new Date(),
    };

    mockFindFirst.mockResolvedValue(mockLastGoal);
    mockCreate.mockResolvedValue(mockCreatedGoal);

    const result = await goalsController.createGoal({ name: mockName, year_id: mockYearId });

    expect(mockFindFirst).toHaveBeenCalledWith({
      where: { year_id: mockYearId },
      orderBy: { sort_order: 'desc' },
    });

    expect(mockCreate).toHaveBeenCalledWith({
      data: {
        name: mockName,
        year_id: mockYearId,
        is_completed: false,
        completed_at: null,
        sort_order: 6,
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      },
    });

    expect(result).toEqual(mockCreatedGoal);
  });

  it('should create a new goal with sort_order = 0 if no goals exist for the year', async () => {
    const mockName = 'New Goal';
    const mockYearId = 2023;
    const mockCreatedGoal = {
      id: 1,
      name: mockName,
      year_id: mockYearId,
      is_completed: false,
      completed_at: null,
      sort_order: 0,
      created_at: new Date(),
      updated_at: new Date(),
    };

    mockFindFirst.mockResolvedValue(null);
    mockCreate.mockResolvedValue(mockCreatedGoal);

    const result = await goalsController.createGoal({ name: mockName, year_id: mockYearId });

    expect(mockFindFirst).toHaveBeenCalledWith({
      where: { year_id: mockYearId },
      orderBy: { sort_order: 'desc' },
    });

    expect(mockCreate).toHaveBeenCalledWith({
      data: {
        name: mockName,
        year_id: mockYearId,
        is_completed: false,
        completed_at: null,
        sort_order: 0,
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      },
    });

    expect(result).toEqual(mockCreatedGoal);
  });

  it('should throw an error if Prisma call fails', async () => {
    mockFindFirst.mockRejectedValue(new Error('Database error'));
    mockCreate.mockRejectedValue(new Error('Database error'));

    await expect(goalsController.createGoal({ name: 'name', year_id: 1 })).rejects.toThrow('Database error');
    await expect(goalsController.createGoal({ name: 'name', year_id: 1 })).rejects.toThrow('Database error');
  });
});

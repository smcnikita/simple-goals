import { prisma } from '@/lib/prisma';

import { goalsController } from '@/controllers/goals-controller';
import { yearsController } from '@/controllers/years-controller';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    goals: {
      update: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

jest.mock('@/controllers/years-controller', () => ({
  yearsController: {
    getYearByName: jest.fn(),
  },
}));

const mockFindMany = prisma.goals.findMany as jest.Mock;
const mockGetYearByName = yearsController.getYearByName as jest.Mock;

describe('getUserGoalsByYear', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return goals for the given year and user', async () => {
    const mockYear = 2023;
    const mockUserId = 1;
    const mockYearModel = { id: 1, year: mockYear, user_id: mockUserId };
    const mockGoals = [
      { id: 1, year_id: mockYearModel.id, title: 'Goal 1', sort_order: 1 },
      { id: 2, year_id: mockYearModel.id, title: 'Goal 2', sort_order: 2 },
    ];

    mockGetYearByName.mockResolvedValue(mockYearModel);
    mockFindMany.mockResolvedValue(mockGoals);

    const result = await goalsController.getUserGoalsByYear(mockYear, mockUserId);

    expect(mockGetYearByName).toHaveBeenCalledWith(mockUserId, mockYear);

    expect(mockFindMany).toHaveBeenCalledWith({
      where: { year_id: mockYearModel.id },
      orderBy: { sort_order: 'asc' },
    });

    expect(result).toEqual(mockGoals);
  });

  it('should return null if the year does not exist', async () => {
    const mockYear = 2023;
    const mockUserId = 1;

    mockGetYearByName.mockResolvedValue(null);

    const result = await goalsController.getUserGoalsByYear(mockYear, mockUserId);

    expect(mockGetYearByName).toHaveBeenCalledWith(mockUserId, mockYear);

    expect(mockFindMany).not.toHaveBeenCalled();

    expect(result).toBeNull();
  });

  it('should throw an error if prisma.findMany fails', async () => {
    const mockYear = 2023;
    const mockUserId = 1;
    const mockYearModel = { id: 1, year: mockYear, user_id: mockUserId };

    mockGetYearByName.mockResolvedValue(mockYearModel);
    mockFindMany.mockRejectedValue(new Error('Database error'));

    await expect(goalsController.getUserGoalsByYear(mockYear, mockUserId)).rejects.toThrow('Database error');

    expect(mockGetYearByName).toHaveBeenCalledWith(mockUserId, mockYear);

    expect(mockFindMany).toHaveBeenCalledWith({
      where: { year_id: mockYearModel.id },
      orderBy: { sort_order: 'asc' },
    });
  });

  it('should throw an error if Prisma call fails', async () => {
    mockFindMany.mockRejectedValue(new Error('Database error'));
    mockGetYearByName.mockRejectedValue(new Error('Database error'));

    await expect(goalsController.getUserGoalsByYear(2023, 1)).rejects.toThrow('Database error');
    await expect(goalsController.getUserGoalsByYear(2023, 1)).rejects.toThrow('Database error');
  });
});

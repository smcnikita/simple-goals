import { prisma } from '@/lib/prisma';

import { yearsController } from '../years-controller';
import { yearsService } from '@/services/years-service';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    years: {
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
    },
  },
}));

jest.mock('@/services/years-service', () => ({
  yearsService: {
    getFormattedYears: jest.fn(),
  },
}));

const create = prisma.years.create as jest.Mock;
const findMany = prisma.years.findMany as jest.Mock;
const findFirst = prisma.years.findFirst as jest.Mock;
const getFormattedYears = yearsService.getFormattedYears as jest.Mock;

const MOCK_USER_ID = 1;
const MOCK_YEAR = { id: 1, user_id: 1, year: 2024 };
const MOCK_YEARS = [MOCK_YEAR];

describe('years-controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createYear', () => {
    it('should create a new year in the database with the correct data', async () => {
      create.mockResolvedValue(MOCK_YEAR);
      const result = await yearsController.createYear(MOCK_USER_ID, MOCK_YEAR.year);

      expect(create).toHaveBeenCalledWith({
        data: { user_id: MOCK_USER_ID, year: MOCK_YEAR.year },
      });

      expect(result).toEqual(MOCK_YEAR);
    });
  });

  describe('getUserYearsFromDatabase', () => {
    it('should fetch user years from the database', async () => {
      findMany.mockResolvedValue(MOCK_YEARS);
      const result = await yearsController.getUserYearsFromDatabase(MOCK_USER_ID);

      expect(findMany).toHaveBeenCalledWith({ where: { user_id: MOCK_USER_ID } });
      expect(result).toEqual(MOCK_YEARS);
    });
  });

  describe('getUserYearsFormatted', () => {
    it('should get formatted user years using yearsService', async () => {
      findMany.mockResolvedValue(MOCK_YEARS);
      getFormattedYears.mockResolvedValue(['Formatted Year']);

      const result = await yearsController.getUserYearsFormatted(MOCK_USER_ID);

      expect(findMany).toHaveBeenCalledWith({ where: { user_id: MOCK_USER_ID } });
      expect(getFormattedYears).toHaveBeenCalledWith({
        userId: MOCK_USER_ID,
        existingYears: MOCK_YEARS,
      });
      expect(result).toEqual(['Formatted Year']);
    });
  });

  describe('getYearByName', () => {
    it('should find a year by userId and year', async () => {
      findFirst.mockResolvedValue(MOCK_YEAR);
      const result = await yearsController.getYearByName(MOCK_USER_ID, MOCK_YEAR.year);

      expect(findFirst).toHaveBeenCalledWith({ where: { user_id: MOCK_USER_ID, year: MOCK_YEAR.year } });
      expect(result).toEqual(MOCK_YEAR);
    });
  });
});

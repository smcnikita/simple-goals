import { prisma } from '@/lib/prisma';

import { userController } from '../user-controller';

import type { UserModel } from '@/models/users-model';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    users: {
      findUnique: jest.fn(),
    },
  },
}));

const findUnique = prisma.users.findUnique as jest.Mock;

const MOCK_USER: UserModel = {
  id: 1,
  name: 'Test User',
  email: 'example@example.com',
  created_at: new Date(),
  updated_at: new Date(),
};

describe('user-controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getUserById', () => {
    it('should return user with the given id', async () => {
      findUnique.mockResolvedValue(MOCK_USER);

      const result = await userController.getUserById(MOCK_USER.id);

      expect(findUnique).toHaveBeenCalledWith({
        where: { id: MOCK_USER.id },
        select: { id: true, name: true, email: true, created_at: true, updated_at: true },
      });

      expect(result).toEqual(MOCK_USER);
    });
  });

  describe('getUserByEmail', () => {
    it('should return user with the given id', async () => {
      const mockUser: UserModel = {
        id: 1,
        name: 'John Doe',
        email: MOCK_USER.email,
        created_at: new Date(),
        updated_at: new Date(),
      };

      findUnique.mockResolvedValue(mockUser);

      const result = await userController.getUserByEmail(MOCK_USER.email);

      expect(findUnique).toHaveBeenCalledWith({
        where: { email: MOCK_USER.email },
        select: { id: true, name: true, email: true, created_at: true, updated_at: true },
      });

      expect(result).toEqual(mockUser);
    });
  });
});

import { prisma } from '@/lib/prisma';

import { userController } from '../../user-controller';

import type { UserModel } from '@/models/users-model';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    users: {
      findUnique: jest.fn(),
    },
  },
}));

const mockFindUnique = prisma.users.findUnique as jest.Mock;

describe('getUserById', () => {
  it('should return user with the given id', async () => {
    const mockUserId = 1;
    const mockUser: UserModel = {
      id: mockUserId,
      name: 'John Doe',
      email: 'eOYb3@example.com',
      created_at: new Date(),
      updated_at: new Date(),
    };

    mockFindUnique.mockResolvedValue(mockUser);

    const result = await userController.getUserById(mockUserId);

    expect(mockFindUnique).toHaveBeenCalledWith({
      where: { id: mockUserId },
      select: { id: true, name: true, email: true, created_at: true, updated_at: true },
    });

    expect(result).toEqual(mockUser);
  });

  it('should throw an error if Prisma call fails', async () => {
    mockFindUnique.mockRejectedValue(new Error('Database error'));

    await expect(userController.getUserById(1)).rejects.toThrow('Database error');
  });
});

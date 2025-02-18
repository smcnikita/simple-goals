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
const mockUserEmail = 'eOYb3@example.com';

describe('getUserById', () => {
  it('should return user with the given id', async () => {
    const mockUser: UserModel = {
      id: 1,
      name: 'John Doe',
      email: mockUserEmail,
      created_at: new Date(),
      updated_at: new Date(),
    };

    mockFindUnique.mockResolvedValue(mockUser);

    const result = await userController.getUserByEmail(mockUserEmail);

    expect(mockFindUnique).toHaveBeenCalledWith({
      where: { email: mockUserEmail },
      select: { id: true, name: true, email: true, created_at: true, updated_at: true },
    });

    expect(result).toEqual(mockUser);
  });

  it('should throw an error if Prisma call fails', async () => {
    mockFindUnique.mockRejectedValue(new Error('Database error'));

    await expect(userController.getUserByEmail(mockUserEmail)).rejects.toThrow('Database error');
  });
});

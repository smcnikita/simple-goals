import { UserModel } from '@/models/users-model';
import { prisma } from '@/lib/prisma';

// Типы для входных данных и результата
type UserData = {
  id: number;
  name: string;
};

type UserCreationOptions = {
  email: string;
  name: string;
  password: string;
};

type UserInput = {
  user: UserModel | null;
  options: UserCreationOptions;
};

export async function fetchOrCreateUser({ user, options }: UserInput): Promise<UserData> {
  if (user) {
    return {
      id: user.id,
      name: user.name,
    };
  }

  const currentTimestamp = new Date();

  const newUser = await prisma.users.create({
    data: {
      email: options.email,
      name: options.name,
      password: options.password,
      created_at: currentTimestamp,
      updated_at: currentTimestamp,
    },
  });

  return {
    id: newUser.id,
    name: newUser.name,
  };
}

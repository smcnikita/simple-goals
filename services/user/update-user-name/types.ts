import type { Users } from '@prisma/client';

export type Params = {
  userId: number;
  name: string;
};

export type Data = {
  name: Users['name'];
};

import type { Users } from '@prisma/client';

export type UpdateNameParams = {
  userId: number;
  name: string;
};

export type UpdateNameData = {
  name: Users['name'];
};

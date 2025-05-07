import { Goals as GoalsItemModel } from '@prisma/client';
import { StatusKeys } from './statuses.types';

export type GoalsWithStatusItem = GoalsItemModel & {
  status: StatusKeys;
};

export type GoalsWithStatus = GoalsWithStatusItem[];

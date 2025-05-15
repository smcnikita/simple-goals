import type { Goals } from '@prisma/client';

import type { StatusKeys } from './status.types';

export type GoalModel = Goals;

export type GoalModelWithStatus = GoalModel & {
  status: StatusKeys;
};

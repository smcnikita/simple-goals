import type { Goals } from '@prisma/client';

import type { StatusKeys } from '../status/status';

export type GoalModel = Goals;

export type GoalModelWithStatus = GoalModel & {
  status: StatusKeys;
  completed_at: Date | string | null;
};

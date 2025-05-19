import { createGoal } from './create-goal';
import { updateGoal } from './update-goal';
import { markAllAsIncomplete } from './mark-all-as-incomplete';

export const goalsService = {
  createGoal,
  updateGoal,
  markAllAsIncomplete,
};

import { getUserGoals } from './get-user-goals';
import { createGoal } from './create-goal';
import { deleteGoal } from './delete-goal';
import { updateGoal } from './update-goal';
import { markAllAsIncomplete } from './mark-all-as-incomplete';

export const goalsController = {
  getUserGoals,
  createGoal,
  deleteGoal,
  updateGoal,
  markAllAsIncomplete,
};

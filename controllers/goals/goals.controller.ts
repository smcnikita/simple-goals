import { getUserGoals } from './get-user-goals';
import { createGoal } from './create-goal';
import { deleteGoal } from './delete-goal';
import { updateGoal } from './update-goal';

export const goalsController = {
  getUserGoals,
  createGoal,
  deleteGoal,
  updateGoal,
};

import { GoalModel } from '@/models/goals-model';

export type GoalModalSaveParams = {
  id: GoalModel['id'];
  name: GoalModel['name'];
  isCompleted: GoalModel['is_completed'];
  description: GoalModel['description'];
};

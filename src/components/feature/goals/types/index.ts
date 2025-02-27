import { GoalModel } from '@/models/goals-model';

export type GoalModalSaveParams = {
  id: GoalModel['id'];
  name: GoalModel['name'];
  isCompleted: GoalModel['is_completed'];
  description: GoalModel['description'];
};

export type CreateGoalProps = (name: string) => Promise<void>;
export type RemoveGoalProps = (goalId: number) => Promise<void>;
export type UpdateGoalProps = (id: number, name: string, description: string) => Promise<void>;
export type UpdateCompletedProps = (goalId: number, isCompleted: boolean) => Promise<void>;
export type UpdateNameGoalProps = (id: number, name: string) => Promise<void>;

import type { StatusKeys } from '@/types/status.types';
import type { GoalModelWithStatus } from '@/types/goals.types';

export type CreateGoalParams = {
  name: string;
  description: string | null;
  year: number;
  status: StatusKeys;
};

export type UpdateGoalParams = CreateGoalParams & {
  id: number;
};

type DataStore = {
  isLoadingFetch: boolean;
  isLoadingCreate: boolean;
  isLoadingUpdate: boolean;
  isLoadingDelete: boolean;
  isLoadingUpdateCanEditPast: boolean;
  isLoadingShowStatistic: boolean;

  goals: GoalModelWithStatus[];

  canEditPastGoals: boolean;
  isShowStatistic: boolean;
};

type ActionsStore = {
  fetchGoalsData: (year: number) => Promise<void>;
  createGoal: (data: CreateGoalParams) => Promise<void>;
  updateGoal: (data: UpdateGoalParams) => Promise<void>;
  deleteGoal: (id: number, year: number) => Promise<void>;
  updateCanEditPastGoals: (year: number) => Promise<void>;
  updateIsShowStatistic: (year: number) => Promise<void>;
};

export type Store = DataStore & ActionsStore;

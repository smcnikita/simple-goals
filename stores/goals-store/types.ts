import type { StatusKeys } from '@/types/status.types';
import type { GoalModelWithStatus } from '@/types/goals.types';
import type { DescriptionSettings } from '@/types/description-settings.type';

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
  isLoadingDescriptionSettings: boolean;

  goals: GoalModelWithStatus[];

  canEditPastGoals: boolean;
  isShowStatistic: boolean;

  descriptionSettings: DescriptionSettings;
};

type ActionsStore = {
  fetchGoalsData: (year: number) => Promise<void>;
  createGoal: (data: CreateGoalParams) => Promise<void>;
  setGoals: (data: GoalModelWithStatus[]) => Promise<void>;
  updateGoal: (data: UpdateGoalParams) => Promise<void>;
  deleteGoal: (id: number, year: number) => Promise<void>;
  updateCanEditPastGoals: (year: number) => Promise<void>;
  updateIsShowStatistic: (year: number) => Promise<void>;
  updateDescriptionSettings: (year: number, descriptionSettingsId: number) => Promise<void>;
};

export type Store = DataStore & ActionsStore;

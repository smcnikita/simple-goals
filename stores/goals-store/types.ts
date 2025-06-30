import type { StatusKeys } from '@/types/status.types';
import type { GoalModelWithStatus } from '@/types/goals.types';
import type { Section } from '@prisma/client';

export type CreateGoalParams = {
  name: string;
  description: string | null;
  year: number;
  status: StatusKeys;
  section_id: number | null;
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
  isLoadingDeleteSection: boolean;
  isLoadingUpdateSection: boolean;

  goals: GoalModelWithStatus[];
  sections: Section[];

  canEditPastGoals: boolean;
  isShowStatistic: boolean;
};

type ActionsStore = {
  fetchGoalsData: (year: number) => Promise<void>;
  createGoal: (data: CreateGoalParams) => Promise<void>;
  setGoals: (data: GoalModelWithStatus[]) => Promise<void>;
  updateGoal: (data: UpdateGoalParams) => Promise<void>;
  deleteGoal: (id: number, year: number) => Promise<void>;
  updateCanEditPastGoals: (year: number) => Promise<void>;
  updateIsShowStatistic: (year: number) => Promise<void>;

  deleteSection: (sectionId: number, year: number) => Promise<void>;
  updateSection: (sectionId: number, year: number, name: string) => Promise<void>;
};

export type Store = DataStore & ActionsStore;

import type { Section } from '@prisma/client';

import type { StatusKeys } from '@/types/status/status';
import type { GoalModelWithStatus } from '@/types/goals/goal';

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
  isLoadingUpdateCanEditPast: boolean;
  isLoadingShowStatistic: boolean;
  isLoadingDeleteSection: boolean;
  isLoadingUpdateSection: boolean;

  isEncrypted: boolean;

  goals: GoalModelWithStatus[];
  sections: Section[];

  canEditPastGoals: boolean;
  isShowStatistic: boolean;
};

type ActionsStore = {
  updateIsEncrypted: (isEncrypted: boolean) => void;

  fetchGoalsData: (year: number) => Promise<void>;
  createGoal: (data: CreateGoalParams) => Promise<void>;
  setGoals: (data: GoalModelWithStatus[]) => Promise<void>;
  updateGoal: (data: UpdateGoalParams) => Promise<void>;
  deleteGoal: (id: number, year: number) => Promise<void>;
  updateCanEditPastGoals: (year: number) => Promise<void>;
  updateIsShowStatistic: (year: number) => Promise<void>;

  deleteSection: (sectionId: number, year: number) => Promise<void>;
  updateSection: (sectionId: number, year: number, name: string) => Promise<void>;
  addSection: (section: Section) => void;
};

export type Store = DataStore & ActionsStore;

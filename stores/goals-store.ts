import { create } from 'zustand';

import { httpCreateGoal, httpDeleteGoal, httpGetGoal, httpUpdateGoal } from '@/lib/http/goals.http';

import type { StatusDBKeys } from '@/types/statuses.types';
import type { GoalsWithStatus } from '@/types/goals.types';
import { httpUpdateCanEditPast, httpUpdateShowStatistic } from '@/lib/http/years.http';

type Data = {
  name: string;
  description: string | null;
  year: number;
  status: StatusDBKeys;
};

type DataWithId = Data & {
  id: number;
};

type HttpStore = {
  fetchGoalsData: (year: number) => Promise<void>;
  createGoal: (data: Data) => Promise<void>;
  updateGoal: (data: DataWithId) => Promise<void>;
  deleteGoal: (id: number, year: number) => Promise<void>;
  updateCanEditPastGoals: (year: number) => Promise<void>;
  updateIsShowStatistic: (year: number) => Promise<void>;
};

type Store = HttpStore & {
  isLoadingFetch: boolean;
  isLoadingCreate: boolean;
  isLoadingUpdate: boolean;
  isLoadingDelete: boolean;
  goals: GoalsWithStatus;
  canEditPastGoals: boolean;
  isShowStatistic: boolean;
  isLoadingUpdateCanEditPast: boolean;
  isLoadingShowStatistic: boolean;
};

export const useGoalsStore = create<Store>()((set) => ({
  isLoadingFetch: true,
  isLoadingCreate: false,
  isLoadingUpdate: false,
  isLoadingDelete: false,
  goals: [],
  canEditPastGoals: false,
  isShowStatistic: true,
  isLoadingUpdateCanEditPast: false,
  isLoadingShowStatistic: false,

  fetchGoalsData: async (year: number) => {
    set({ isLoadingFetch: true });
    try {
      const response = await httpGetGoal(year);
      set({
        goals: response.data.goals,
        canEditPastGoals: response.data.can_edit_past_goals,
        isShowStatistic: response.data.show_statistic,
      });
    } finally {
      set({ isLoadingFetch: false });
    }
  },

  createGoal: async (data: Data) => {
    set({ isLoadingCreate: true });

    try {
      const res = await httpCreateGoal({
        name: data.name,
        description: data.description ?? undefined,
        status: data.status,
        year: data.year,
      });
      set((state) => ({
        goals: [...state.goals, res.data],
      }));
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    } finally {
      set({ isLoadingCreate: false });
    }
  },

  deleteGoal: async (id: number, year: number) => {
    set({ isLoadingDelete: true });

    try {
      const res = await httpDeleteGoal({ id, year });
      set((state) => ({
        goals: state.goals.filter((goal) => goal.id !== res.data.id),
      }));
    } finally {
      set({ isLoadingDelete: false });
    }
  },

  updateGoal: async (data: DataWithId) => {
    set({ isLoadingUpdate: true });

    try {
      const res = await httpUpdateGoal({
        id: data.id,
        name: data.name,
        description: data.description ?? undefined,
        status: data.status,
        year: data.year,
      });
      set((state) => ({
        goals: state.goals.map((goal) => (goal.id === res.data.id ? res.data : goal)),
      }));
    } finally {
      set({ isLoadingUpdate: false });
    }
  },

  updateCanEditPastGoals: async (year: number) => {
    set({ isLoadingUpdateCanEditPast: true });

    try {
      const res = await httpUpdateCanEditPast({ year });

      set(() => ({
        canEditPastGoals: res.data.year.can_edit_past,
      }));
    } finally {
      set({ isLoadingUpdateCanEditPast: false });
    }
  },

  updateIsShowStatistic: async (year: number) => {
    set({ isLoadingShowStatistic: true });

    try {
      const res = await httpUpdateShowStatistic({ year });

      set(() => ({
        isShowStatistic: res.data.year.show_statistic,
      }));
    } finally {
      set({ isLoadingShowStatistic: false });
    }
  },
}));

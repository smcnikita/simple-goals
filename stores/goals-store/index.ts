import { create } from 'zustand';

import { httpCreateGoal, httpDeleteGoal, httpGetGoal, httpUpdateGoal } from '@/lib/http/goals.http';
import { httpUpdateCanEditPast, httpUpdateShowStatistic } from '@/lib/http/years.http';
import { httpGetSections } from '@/lib/http/get-sections';

import type { Store, CreateGoalParams, UpdateGoalParams } from './types';

import type { GoalModelWithStatus } from '@/types/goals.types';

export const useGoalsStore = create<Store>()((set) => ({
  isLoadingFetch: true,
  isLoadingCreate: false,
  isLoadingUpdate: false,
  isLoadingDelete: false,
  isLoadingUpdateCanEditPast: false,
  isLoadingShowStatistic: false,

  goals: [],
  sections: [],

  canEditPastGoals: false,
  isShowStatistic: true,

  fetchGoalsData: async (year: number) => {
    set({ isLoadingFetch: true });
    try {
      const response = await httpGetGoal(year);
      const sections = await httpGetSections(year);
      set({
        goals: response.data.goals,
        sections: sections.data.sections,
        canEditPastGoals: response.data.can_edit_past_goals,
        isShowStatistic: response.data.show_statistic,
      });
    } finally {
      set({ isLoadingFetch: false });
    }
  },

  createGoal: async (data: CreateGoalParams) => {
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

  setGoals: async (data: GoalModelWithStatus[]) => {
    set((state) => {
      const existingGoals = state.goals;

      const updatedGoals = [...existingGoals];

      for (const newGoal of data) {
        const index = existingGoals.findIndex((g) => g.id === newGoal.id);

        if (index !== -1) {
          updatedGoals[index] = { ...existingGoals[index], ...newGoal };
        } else {
          updatedGoals.push(newGoal);
        }
      }

      return { goals: updatedGoals };
    });
  },

  updateGoal: async (data: UpdateGoalParams) => {
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

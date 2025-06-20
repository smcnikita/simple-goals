import { create } from 'zustand';

import { httpCreateGoal, httpDeleteGoal, httpGetGoal, httpUpdateGoal } from '@/lib/http/goals.http';
import { httpUpdateCanEditPast, httpUpdateShowStatistic } from '@/lib/http/years.http';
import { httpUpdateDescriptionSettings } from '@/lib/http/description-settings.http';

import type { Store, CreateGoalParams, UpdateGoalParams } from './types';

import type { GoalModelWithStatus } from '@/types/goals.types';
import type { DescriptionSettings } from '@/types/description-settings.type';

const DEFAULT_DESCRIPTION_SETTINGS: DescriptionSettings = {
  id: 0,
  value: 'display_none',
};

export const useGoalsStore = create<Store>()((set) => ({
  isLoadingFetch: true,
  isLoadingCreate: false,
  isLoadingUpdate: false,
  isLoadingDelete: false,
  isLoadingUpdateCanEditPast: false,
  isLoadingShowStatistic: false,
  isLoadingDescriptionSettings: false,

  goals: [],

  canEditPastGoals: false,
  isShowStatistic: true,

  descriptionSettings: DEFAULT_DESCRIPTION_SETTINGS,

  fetchGoalsData: async (year: number) => {
    set({ isLoadingFetch: true });
    try {
      const response = await httpGetGoal(year);
      set({
        goals: response.data.goals,
        canEditPastGoals: response.data.can_edit_past_goals,
        isShowStatistic: response.data.show_statistic,
        descriptionSettings: response.data.description_settings,
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

  updateDescriptionSettings: async (year: number, descriptionSettingsId: number) => {
    set({ isLoadingDescriptionSettings: true });

    try {
      const res = await httpUpdateDescriptionSettings({ year, descriptionSettingsId });

      set(() => ({
        descriptionSettings: res.data.description_settings,
      }));
    } finally {
      set({ isLoadingDescriptionSettings: false });
    }
  },
}));

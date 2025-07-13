import { create } from 'zustand';

import { httpCreateGoal, httpDeleteGoal, httpGetGoal, httpUpdateGoal } from '@/lib/http/goals.http';
import { httpUpdateCanEditPast, httpUpdateShowStatistic } from '@/lib/http/years.http';
import { httpDeleteSection, httpGetSections, httpUpdateSection } from '@/lib/http/get-sections';

import type { Store, CreateGoalParams, UpdateGoalParams } from './types';

import type { GoalModelWithStatus } from '@/types/goals.types';
import { Section } from '@prisma/client';
import { decryptText, encryptText } from '@/utils/cryptoHelper';

export const useGoalsStore = create<Store>()((set, get) => ({
  isLoadingFetch: true,
  isLoadingCreate: false,
  isLoadingUpdate: false,
  isLoadingDelete: false,
  isLoadingUpdateCanEditPast: false,
  isLoadingShowStatistic: false,
  isLoadingDeleteSection: false,
  isLoadingUpdateSection: false,

  isEncrypted: true,

  goals: [],
  sections: [],

  canEditPastGoals: false,
  isShowStatistic: true,

  updateIsEncrypted: (isEncrypted: boolean) => {
    set({ isEncrypted });
  },

  fetchGoalsData: async (year: number) => {
    set({ isLoadingFetch: true });

    try {
      const response = await httpGetGoal(year);
      const sections = await httpGetSections(year);

      let goals = response.data.goals;

      const { isEncrypted } = get();

      if (isEncrypted) {
        goals = goals.map((goal) => ({
          ...goal,
          name: decryptText(goal.name),
        }));
      }

      set({
        goals,
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

    const { isEncrypted } = get();

    try {
      const res = await httpCreateGoal({
        name: isEncrypted ? encryptText(data.name) : data.name,
        description: data.description ?? undefined,
        status: data.status,
        year: data.year,
        section_id: data.section_id,
      });

      set((state) => ({
        goals: [
          ...state.goals,
          {
            ...res.data,
            name: isEncrypted ? decryptText(res.data.name) : res.data.name,
          },
        ],
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

    const { isEncrypted } = get();

    try {
      const res = await httpUpdateGoal({
        id: data.id,
        name: isEncrypted ? encryptText(data.name) : data.name,
        description: data.description ?? undefined,
        status: data.status,
        year: data.year,
        section_id: data.section_id,
      });

      set((state) => ({
        goals: state.goals.map((goal) => {
          if (goal.id === res.data.id) {
            return {
              ...res.data,
              name: isEncrypted ? decryptText(res.data.name) : res.data.name,
            };
          } else {
            return goal;
          }
        }),
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

  deleteSection: async (sectionId: number, year: number) => {
    set({ isLoadingDeleteSection: true });

    try {
      const res = await httpDeleteSection({ sectionId, year });
      set((state) => ({
        sections: state.sections.filter((section) => section.id !== res.data.sectionId),
        goals: state.goals.map((goal) => {
          if (goal.section_id === res.data.sectionId) {
            return { ...goal, section_id: null };
          }
          return goal;
        }),
      }));
    } finally {
      set({ isLoadingDeleteSection: false });
    }
  },

  updateSection: async (sectionId: number, year: number, name: string) => {
    set({ isLoadingUpdateSection: true });

    try {
      const res = await httpUpdateSection({ sectionId, name, year });
      set((state) => ({
        sections: state.sections.map((section) => {
          if (section.id === res.data.section.id) {
            return { ...section, name: res.data.section.name };
          }
          return section;
        }),
      }));
    } finally {
      set({ isLoadingUpdateSection: false });
    }
  },

  addSection: (section: Section) => {
    set((state) => ({
      sections: [...state.sections, section],
    }));
  },
}));

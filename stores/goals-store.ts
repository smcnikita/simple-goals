import { create } from 'zustand';

import { httpCreateGoal, httpDeleteGoal, httpGetGoal, httpUpdateGoal } from '@/lib/http/goals.http';

import type { StatusDBKeys } from '@/types/statuses.types';
import type { GoalsWithStatus } from '@/types/goals.types';

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
};

type Store = HttpStore & {
  isLoadingFetch: boolean;
  isLoadingCreate: boolean;
  isLoadingUpdate: boolean;
  isLoadingDelete: boolean;
  goals: GoalsWithStatus;
};

export const useGoalsStore = create<Store>()((set) => ({
  isLoadingFetch: true,
  isLoadingCreate: false,
  isLoadingUpdate: false,
  isLoadingDelete: false,
  goals: [],

  fetchGoalsData: async (year: number) => {
    set({ isLoadingFetch: true });
    try {
      const response = await httpGetGoal(year);
      set({ goals: response.data.goals });
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
}));

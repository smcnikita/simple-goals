'use client';

import toast from 'react-hot-toast';

import { httpChangeNameGoal, httpCreateGoal, httpRemoveGoal, httpUpdateGoal } from '@/lib/http/goals';

import type { GoalModel } from '@/models/goals-model';

type Props = {
  canChangeGoal: boolean;
  year: number;
  goals: GoalModel[];
  updateGoals: (value: GoalModel[]) => void;
};

const useGoalActions = ({ canChangeGoal, year, goals, updateGoals }: Props) => {
  const create = async (name: string) => {
    if (!canChangeGoal) {
      return;
    }

    const res = await httpCreateGoal(year, name);
    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
      return;
    }

    const newGoal = data.data as GoalModel;

    updateGoals([...goals, newGoal]);
  };

  const remove = async (goalId: number) => {
    if (!canChangeGoal) {
      return;
    }

    const res = await httpRemoveGoal(goalId, year);
    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
      return;
    }

    const newGoals = goals.filter((goal) => goal.id !== goalId);

    updateGoals(newGoals);
  };

  const updateCompleted = async (goalId: number, isCompleted: boolean) => {
    if (!canChangeGoal) {
      return;
    }

    const res = await httpUpdateGoal(goalId, isCompleted, year);
    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
      return;
    }

    const newGoals = goals.map((goal) => {
      if (goal.id === goalId) {
        return {
          ...goal,
          is_completed: isCompleted,
          completed_at: isCompleted ? new Date() : null,
        };
      }
      return goal;
    });

    updateGoals(newGoals);
  };

  const updateName = async (goalId: number, newName: string) => {
    if (!canChangeGoal) {
      return;
    }

    const res = await httpChangeNameGoal(goalId, year, newName);
    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
      return;
    }

    const newGoals = goals.map((goal) => {
      if (goal.id === goalId) {
        return {
          ...goal,
          name: newName,
        };
      }
      return goal;
    });

    updateGoals(newGoals);
  };

  return { create, remove, updateCompleted, updateName };
};

export default useGoalActions;

'use client';

import toast from 'react-hot-toast';

import { httpChangeNameGoal, httpCreateGoal, httpRemoveGoal, httpUpdateGoal } from '@/lib/http/goals';

import type { GoalModel } from '@/models/goals-model';
import { useState } from 'react';

type Props = {
  canChangeGoal: boolean;
  year: number;
  goals: GoalModel[];
  updateGoals: (value: GoalModel[]) => void;
};

const useGoalActions = ({ canChangeGoal, year, goals, updateGoals }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const onLoadingStart = (message: string) => {
    setIsLoading(true);

    toast.loading(message);
  };

  const onLoadingEnd = (message: string) => {
    toast.remove();
    toast.success(message);

    setIsLoading(false);
  };

  const onError = (message: string) => {
    toast.remove();
    toast.error(message);

    setIsLoading(false);
  };

  const create = async (name: string) => {
    if (!canChangeGoal) {
      return;
    }

    onLoadingStart('Creating goal...');

    const res = await httpCreateGoal(year, name);
    const data = await res.json();

    if (!res.ok) {
      onError(data.message);
      return;
    }

    const newGoal = data.data as GoalModel;

    updateGoals([...goals, newGoal]);

    onLoadingEnd('Goal created');
  };

  const remove = async (goalId: number) => {
    if (!canChangeGoal) {
      return;
    }

    onLoadingStart('Removing goal...');

    const res = await httpRemoveGoal(goalId, year);
    const data = await res.json();

    if (!res.ok) {
      onError(data.message);
      return;
    }

    const newGoals = goals.filter((goal) => goal.id !== goalId);

    updateGoals(newGoals);

    onLoadingEnd('Goal removed');
  };

  const updateCompleted = async (goalId: number, isCompleted: boolean) => {
    if (!canChangeGoal) {
      return;
    }

    onLoadingStart('Updating goal...');

    const res = await httpUpdateGoal(goalId, isCompleted, year);
    const data = await res.json();

    if (!res.ok) {
      onError(data.message);
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

    onLoadingEnd('Goal updated');
  };

  const updateName = async (goalId: number, newName: string) => {
    if (!canChangeGoal) {
      return;
    }

    onLoadingStart('Updating goal...');

    const res = await httpChangeNameGoal(goalId, year, newName);
    const data = await res.json();

    if (!res.ok) {
      onError(data.message);
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

    onLoadingEnd('Goal updated');
  };

  return { isLoading, create, remove, updateCompleted, updateName };
};

export default useGoalActions;

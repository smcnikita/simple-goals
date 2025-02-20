'use client';

import toast from 'react-hot-toast';

import { httpChangeNameGoal, httpCreateGoal, httpRemoveGoal, httpUpdateGoal } from '@/lib/http/goals';

import type { GoalModel } from '@/models/goals-model';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

type Props = {
  canChangeGoal: boolean;
  year: number;
  goals: GoalModel[];
  updateGoals: (value: GoalModel[]) => void;
};

const useGoalActions = ({ canChangeGoal, year, goals, updateGoals }: Props) => {
  const t = useTranslations('Goals');

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

    onLoadingStart(t('creatingGoal'));

    const res = await httpCreateGoal(year, name);
    const data = await res.json();

    if (!res.ok) {
      onError(data.message);
      return;
    }

    const newGoal = data.data as GoalModel;

    updateGoals([...goals, newGoal]);

    onLoadingEnd(t('goalCreated'));
  };

  const remove = async (goalId: number) => {
    if (!canChangeGoal) {
      return;
    }

    onLoadingStart(t('removingGoal'));

    const res = await httpRemoveGoal(goalId, year);
    const data = await res.json();

    if (!res.ok) {
      onError(data.message);
      return;
    }

    const newGoals = goals.filter((goal) => goal.id !== goalId);

    updateGoals(newGoals);

    onLoadingEnd(t('goalRemoved'));
  };

  const updateCompleted = async (goalId: number, isCompleted: boolean) => {
    if (!canChangeGoal) {
      return;
    }

    onLoadingStart(t('updatingGoal'));

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

    onLoadingEnd(t('goalUpdated'));
  };

  const updateName = async (goalId: number, newName: string) => {
    if (!canChangeGoal) {
      return;
    }

    onLoadingStart(t('updatingGoal'));

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
          name: newName.trim(),
        };
      }
      return goal;
    });

    updateGoals(newGoals);

    onLoadingEnd(t('goalUpdated'));
  };

  return { isLoading, create, remove, updateCompleted, updateName };
};

export default useGoalActions;

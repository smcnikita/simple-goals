'use client';

import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';

import {
  httpChangeNameAndDescriptionGoal,
  httpChangeNameGoal,
  httpCreateGoal,
  httpRemoveGoal,
  httpUpdateGoal,
} from '@/lib/http/goals';

import type { GoalModel } from '@/models/goals-model';

import type {
  CreateGoalProps,
  GoalModalSaveParams,
  RemoveGoalProps,
  UpdateCompletedProps,
  UpdateGoalProps,
  UpdateNameGoalProps,
} from '../types';

type Props = {
  canChangeGoal: boolean;
  year: number;
  goals: GoalModel[];

  updateIsLoading: (value: boolean) => void;
  updateGoals: (value: GoalModel[]) => void;
  updateIsOpenModal: (value: boolean) => void;
  updateGoalDataForModal: (value: GoalModalSaveParams | null) => void;
};

const useGoalActions = (props: Props) => {
  const { canChangeGoal, year, goals, updateGoals, updateIsOpenModal, updateGoalDataForModal, updateIsLoading } = props;

  const t = useTranslations('Goals');

  const onLoadingStart = (message: string) => {
    updateIsLoading(true);

    toast.loading(message);
  };

  const onLoadingEnd = (message: string) => {
    toast.remove();
    toast.success(message);

    updateIsLoading(false);
  };

  const onError = (message: string) => {
    toast.remove();
    toast.error(message);

    updateIsLoading(false);
  };

  const create: CreateGoalProps = async (name: string) => {
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

  const remove: RemoveGoalProps = async (goalId: number) => {
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

    updateIsOpenModal(false);

    onLoadingEnd(t('goalRemoved'));
  };

  const updateCompleted: UpdateCompletedProps = async (goalId: number, isCompleted: boolean) => {
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

    updateIsOpenModal(false);

    onLoadingEnd(t('goalUpdated'));
  };

  const updateName: UpdateNameGoalProps = async (goalId: number, newName: string) => {
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

  const updateNameAndDescription: UpdateGoalProps = async (goalId: number, newName: string, newDescription: string) => {
    if (!canChangeGoal) {
      return;
    }

    onLoadingStart(t('updatingGoal'));

    const res = await httpChangeNameAndDescriptionGoal(goalId, year, newName.trim(), newDescription.trim());
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
          description: newDescription.trim(),
        };
      }
      return goal;
    });

    updateGoals(newGoals);

    updateIsOpenModal(false);
    updateGoalDataForModal(null);

    onLoadingEnd(t('goalUpdated'));
  };

  return { create, remove, updateCompleted, updateName, updateNameAndDescription };
};

export default useGoalActions;

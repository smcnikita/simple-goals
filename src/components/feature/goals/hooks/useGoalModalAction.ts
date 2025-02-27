'use client';

import { useState } from 'react';

import type { GoalModalSaveParams } from '../types';

type Props = {
  isLoading: boolean;
  canChangeGoal: boolean;
};

const useGoalModalAction = ({ isLoading, canChangeGoal }: Props) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [goalDataForModal, setGoalDataForModal] = useState<GoalModalSaveParams | null>(null);

  const updateIsOpenModal = (value: boolean) => setIsOpenModal(value);
  const updateGoalDataForModal = (value: GoalModalSaveParams | null) => setGoalDataForModal(value);

  const openModal = (goal: GoalModalSaveParams) => {
    if (!canChangeGoal || isLoading) {
      return;
    }

    setIsOpenModal(true);
    setGoalDataForModal(goal);
  };

  const cancelModal = () => {
    if (!canChangeGoal || isLoading) {
      return;
    }

    setIsOpenModal(false);
    setGoalDataForModal(null);
  };

  return { isOpenModal, goalDataForModal, updateIsOpenModal, openModal, cancelModal, updateGoalDataForModal };
};

export default useGoalModalAction;

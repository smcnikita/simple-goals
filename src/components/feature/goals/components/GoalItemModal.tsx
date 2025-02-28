'use client';

import { type FC } from 'react';

import ModalComponent from '@/components/ui/modal';

import ModalContent from './modal/ModalContent';

import type { GoalModalSaveParams, UpdateCompletedProps, UpdateGoalProps, RemoveGoalProps } from '../types';

type Props = {
  isOpenModal: boolean;
  goalData: GoalModalSaveParams | null;
  canChangeGoal: boolean;
  isLoading: boolean;

  handleSave: UpdateGoalProps;
  handleCancel: () => void;

  updateCompleted: UpdateCompletedProps;
  onRemove: RemoveGoalProps;
};

const GoalItemModal: FC<Props> = (props) => {
  const { goalData, isOpenModal, canChangeGoal, isLoading, handleSave, handleCancel, updateCompleted, onRemove } =
    props;

  return (
    <ModalComponent isOpen={isOpenModal} trigger={<></>} onRequestClose={handleCancel}>
      <ModalContent
        goalData={goalData}
        handleCancel={handleCancel}
        handleSave={handleSave}
        updateCompleted={updateCompleted}
        onRemove={onRemove}
        canChangeGoal={canChangeGoal}
        isLoading={isLoading}
      />
    </ModalComponent>
  );
};

export default GoalItemModal;

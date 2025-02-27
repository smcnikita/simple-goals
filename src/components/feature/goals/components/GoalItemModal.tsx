'use client';

import { type FC } from 'react';

import ModalComponent from '@/components/ui/modal';

import ModalContent from './modal/ModalContent';

import type { GoalModalSaveParams } from '../types';

type Props = {
  isOpenModal: boolean;
  goalData: GoalModalSaveParams | null;
  canChangeGoal: boolean;
  isLoading: boolean;

  handleSave: (id: number, name: string, description: string) => Promise<void>;
  handleCancel: () => void;

  updateCompleted: (goalId: number, isCompleted: boolean) => Promise<void>;
};

const GoalItemModal: FC<Props> = (props) => {
  const { goalData, isOpenModal, canChangeGoal, isLoading, handleSave, handleCancel, updateCompleted } = props;

  return (
    <ModalComponent isOpen={isOpenModal} trigger={<></>} onRequestClose={handleCancel}>
      <ModalContent
        goalData={goalData}
        handleCancel={handleCancel}
        handleSave={handleSave}
        updateCompleted={updateCompleted}
        canChangeGoal={canChangeGoal}
        isLoading={isLoading}
      />
    </ModalComponent>
  );
};

export default GoalItemModal;

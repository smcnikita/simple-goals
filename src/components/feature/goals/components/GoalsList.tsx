'use client';

import { type FC } from 'react';
import { useTranslations } from 'next-intl';

import type { GoalModel } from '@/models/goals-model';

import useGoal from '../hooks/useGoal';

import GoalsItemAddNew from './edit/GoalsItemAddNew';
import BaseList from './list/BaseList';
import GoalItemModal from './GoalItemModal';

import type {
  CreateGoalProps,
  GoalModalSaveParams,
  RemoveGoalProps,
  UpdateCompletedProps,
  UpdateGoalProps,
  UpdateNameGoalProps,
} from '../types';

import cl from '../style/goals.module.css';

type Props = {
  goals: GoalModel[];
  canChangeGoal: boolean;
  isShowAddGoal: boolean;
  isLoading: boolean;
  isOpenModal: boolean;
  goalDataForModal: GoalModalSaveParams | null;

  create: CreateGoalProps;
  remove: RemoveGoalProps;
  updateCompleted: UpdateCompletedProps;
  updateName: UpdateNameGoalProps;
  handleSave: UpdateGoalProps;
  updateIsShowAddGoal: (value: boolean) => void;
  handleUpdateCompleted: UpdateCompletedProps;
  handleOpenModal: (goal: GoalModalSaveParams) => void;
  handleCancelModal: () => void;
};

const GoalsList: FC<Props> = (props) => {
  const {
    goals,
    canChangeGoal,
    isShowAddGoal,
    isLoading,
    isOpenModal,
    goalDataForModal,
    updateCompleted,
    remove,
    updateName,
    handleSave,
    create,
    handleUpdateCompleted,
    updateIsShowAddGoal,
    handleOpenModal,
    handleCancelModal,
  } = props;

  const t = useTranslations('Goals');

  const { completedGoals, uncompletedGoals } = useGoal({ goals });

  if (goals.length === 0) {
    return (
      <>
        <p className={cl.noGoals}>{t('noGoals')}</p>

        {isShowAddGoal && (
          <div className={cl.item}>
            <GoalsItemAddNew isLoading={isLoading} create={create} updateIsAddNewGoal={updateIsShowAddGoal} />
          </div>
        )}
      </>
    );
  }

  return (
    <div className={cl.items}>
      <BaseList
        title={t('count', { completed: completedGoals.length, goals: goals.length })}
        goals={uncompletedGoals}
        isLoading={isLoading}
        canChangeGoal={canChangeGoal}
        remove={remove}
        updateCompleted={updateCompleted}
        updateName={updateName}
        handleOpenModal={handleOpenModal}
      />

      {isShowAddGoal && (
        <div className={cl.item}>
          <GoalsItemAddNew isLoading={isLoading} create={create} updateIsAddNewGoal={updateIsShowAddGoal} />
        </div>
      )}

      {completedGoals.length > 0 && (
        <BaseList
          title={t('completed')}
          goals={completedGoals}
          isLoading={isLoading}
          canChangeGoal={canChangeGoal}
          remove={remove}
          updateCompleted={updateCompleted}
          updateName={updateName}
          handleOpenModal={handleOpenModal}
        />
      )}

      <GoalItemModal
        isOpenModal={isOpenModal}
        goalData={goalDataForModal}
        canChangeGoal={canChangeGoal}
        isLoading={isLoading}
        handleCancel={handleCancelModal}
        handleSave={handleSave}
        updateCompleted={handleUpdateCompleted}
      />
    </div>
  );
};

export default GoalsList;

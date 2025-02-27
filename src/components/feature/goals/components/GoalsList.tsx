'use client';

import { useMemo, useState, type FC } from 'react';

import type { GoalModel } from '@/models/goals-model';

import GoalsItem from './GoalsItem';
import GoalsItemAddNew from './edit/GoalsItemAddNew';

import classes from '../style/goals.module.css';
import { useTranslations } from 'next-intl';
import GoalItemModal from './GoalItemModal';
import type { GoalModalSaveParams } from '../types';

type Props = {
  goals: GoalModel[];
  canChangeGoal: boolean;
  isShowAddGoal: boolean;
  isLoading: boolean;

  create: (name: string) => Promise<void>;
  remove: (goalId: number) => Promise<void>;
  updateCompleted: (goalId: number, isCompleted: boolean) => Promise<void>;
  updateName: (goalId: number, newName: string) => Promise<void>;

  updateIsShowAddGoal: (value: boolean) => void;
};

const GoalsList: FC<Props> = (props) => {
  const {
    goals,
    canChangeGoal,
    isShowAddGoal,
    isLoading,
    updateCompleted,
    remove,
    updateName,
    create,
    updateIsShowAddGoal,
  } = props;

  const t = useTranslations('Goals');

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [goalDataForModal, setGoalDataForModal] = useState<GoalModalSaveParams | null>(null);

  const handleOpenModal = (goal: GoalModalSaveParams) => {
    if (!canChangeGoal || isLoading) {
      return;
    }

    setIsOpenModal(true);
    setGoalDataForModal(goal);
  };

  const handleCancel = () => {
    if (!canChangeGoal || isLoading) {
      return;
    }

    setIsOpenModal(false);
    setGoalDataForModal(null); // TODO: мб надо убрать
  };

  const handleSave = async (id: number, name: string) => {
    if (!canChangeGoal || isLoading) {
      return;
    }

    const trimmedName = name;

    if (!trimmedName) {
      return;
    }

    await updateName(id, trimmedName);

    setIsOpenModal(false);
    setGoalDataForModal(null);
  };

  const handleUpdateCompleted = async (goalId: number, isCompleted: boolean) => {
    if (!canChangeGoal || isLoading) {
      return;
    }

    await updateCompleted(goalId, isCompleted);
    setIsOpenModal(false);
  };

  const uncompletedGoals = useMemo(() => {
    return goals.filter((goal) => !goal.is_completed && goal.completed_at === null);
  }, [goals]);

  const completedGoals = useMemo(() => {
    return goals
      .filter((goal) => goal.is_completed && goal.completed_at !== null)
      .sort((a, b) => new Date(a.completed_at!).getTime() - new Date(b.completed_at!).getTime());
  }, [goals]);

  if (goals.length === 0) {
    return (
      <>
        <p className={classes.noGoals}>{t('noGoals')}</p>

        {isShowAddGoal && (
          <div className={classes.item}>
            <GoalsItemAddNew isLoading={isLoading} create={create} updateIsAddNewGoal={updateIsShowAddGoal} />
          </div>
        )}
      </>
    );
  }

  return (
    <div className={classes.items}>
      <div className={classes.items_wrapper}>
        {goals.length > 0 && (
          <p className={classes.items_title}>{t('count', { completed: completedGoals.length, goals: goals.length })}</p>
        )}
        <ul className={classes.list}>
          {uncompletedGoals.map((goal) => (
            <GoalsItem
              key={goal.id}
              isLoading={isLoading}
              goal={goal}
              canChangeGoal={canChangeGoal}
              remove={remove}
              updateCompleted={updateCompleted}
              updateName={updateName}
              handleOpenModal={handleOpenModal}
            />
          ))}
        </ul>
      </div>

      {isShowAddGoal && (
        <div className={classes.item}>
          <GoalsItemAddNew isLoading={isLoading} create={create} updateIsAddNewGoal={updateIsShowAddGoal} />
        </div>
      )}

      {completedGoals.length > 0 && (
        <div className={classes.items_wrapper}>
          <p className={classes.items_title}>{t('completed')}</p>
          <ul className={classes.list}>
            {completedGoals.map((goal) => (
              <GoalsItem
                key={goal.id}
                goal={goal}
                isLoading={isLoading}
                canChangeGoal={canChangeGoal}
                remove={remove}
                updateCompleted={updateCompleted}
                updateName={updateName}
                handleOpenModal={handleOpenModal}
              />
            ))}
          </ul>
        </div>
      )}

      <GoalItemModal
        isOpenModal={isOpenModal}
        goalData={goalDataForModal}
        canChangeGoal={canChangeGoal}
        isLoading={isLoading}
        handleCancel={handleCancel}
        handleSave={handleSave}
        updateCompleted={handleUpdateCompleted}
      />
    </div>
  );
};

export default GoalsList;

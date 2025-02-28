'use client';

import { useEffect, useCallback, type FC } from 'react';
import { useTranslations } from 'next-intl';

import useGoals from '../hooks/useGoals';
import useAddGoal from '../hooks/useAddGoal';
import useGoalActions from '../hooks/useGoalActions';
import useGoalModalAction from '../hooks/useGoalModalAction';

import Spinner from '@/components/ui/spinner';
import Button from '@/components/ui/button';

import GoalsList from './GoalsList';

import cl from '../style/goals.module.css';

type Props = {
  year: number;
  month?: string;
};

const Goals: FC<Props> = ({ year, month }) => {
  const t = useTranslations('Goals');

  const {
    goals,
    canChangeGoal,
    isGlobalLoading,
    isLoading,
    updateIsLoading,
    updateGoals,
    getGoals,
    updateIsGlobalLoading,
  } = useGoals({ year, month });

  const { isShowAddGoal, isShowAddGoalButton, updateIsShowAddGoal } = useAddGoal({ year, month });

  const actionsModal = useGoalModalAction({ canChangeGoal, isLoading });

  const actionsGoal = useGoalActions({
    canChangeGoal,
    goals,
    year,
    month,
    updateGoals,
    updateIsLoading,
    updateGoalDataForModal: actionsModal.updateGoalDataForModal,
    updateIsOpenModal: actionsModal.updateIsOpenModal,
  });

  const fetchGoals = useCallback(async () => {
    updateIsGlobalLoading(true);
    await getGoals();
    updateIsGlobalLoading(false);
  }, [getGoals, updateIsGlobalLoading]);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  const onClickAddGoal = useCallback(() => updateIsShowAddGoal(true), [updateIsShowAddGoal]);

  if (isGlobalLoading) {
    return (
      <section className={cl.section}>
        <Spinner />
      </section>
    );
  }

  return (
    <section className={cl.section}>
      <GoalsList
        goals={goals}
        canChangeGoal={canChangeGoal}
        isOpenModal={actionsModal.isOpenModal}
        goalDataForModal={actionsModal.goalDataForModal}
        create={actionsGoal.create}
        remove={actionsGoal.remove}
        updateCompleted={actionsGoal.updateCompleted}
        updateName={actionsGoal.updateName}
        isShowAddGoal={isShowAddGoal}
        updateIsShowAddGoal={updateIsShowAddGoal}
        handleSave={actionsGoal.updateNameAndDescription}
        handleUpdateCompleted={actionsGoal.updateCompleted}
        handleOpenModal={actionsModal.openModal}
        handleCancelModal={actionsModal.cancelModal}
        isLoading={isLoading}
      />

      {isShowAddGoalButton && (
        <div className={cl.addGoal} onClick={onClickAddGoal}>
          <Button size="sm-2" disabled={isShowAddGoal || isLoading}>
            {t('addGoal')}
          </Button>
        </div>
      )}
    </section>
  );
};

export default Goals;

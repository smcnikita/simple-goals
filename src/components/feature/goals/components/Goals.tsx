'use client';

import { useEffect, type FC } from 'react';
import { useTranslations } from 'next-intl';

import useGoals from '../hooks/useGoals';
import useAddGoal from '../hooks/useAddGoal';
import useGoalActions from '../hooks/useGoalActions';

import Spinner from '@/components/ui/spinner';
import Button from '@/components/ui/button';

import GoalsList from './GoalsList';

import classes from '../style/goals.module.css';

type Props = {
  year: number;
};

const Goals: FC<Props> = ({ year }) => {
  const t = useTranslations('Goals');

  const { goals, canChangeGoal, isGlobalLoading, updateGoals, getGoals, updateIsGlobalLoading } = useGoals({ year });
  const { isShowAddGoal, isShowAddGoalButton, updateIsShowAddGoal } = useAddGoal({ year });
  const { isLoading, create, remove, updateCompleted, updateName } = useGoalActions({
    canChangeGoal,
    goals,
    year,
    updateGoals,
  });

  useEffect(() => {
    updateIsGlobalLoading(true);
    getGoals().then(() => {
      updateIsGlobalLoading(false);
    });
  }, [getGoals, updateIsGlobalLoading]);

  if (isGlobalLoading) {
    return (
      <section className={classes.section}>
        <Spinner />
      </section>
    );
  }

  return (
    <section className={classes.section}>
      <GoalsList
        goals={goals}
        canChangeGoal={canChangeGoal}
        create={create}
        remove={remove}
        updateCompleted={updateCompleted}
        updateName={updateName}
        isShowAddGoal={isShowAddGoal}
        updateIsShowAddGoal={updateIsShowAddGoal}
        isLoading={isLoading}
      />

      {isShowAddGoalButton && (
        <div className={classes.addGoal} onClick={() => updateIsShowAddGoal(true)}>
          <Button size="sm-2" disabled={isShowAddGoal || isLoading}>
            {t('addGoal')}
          </Button>
        </div>
      )}
    </section>
  );
};

export default Goals;

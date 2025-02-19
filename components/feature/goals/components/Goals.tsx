'use client';

import { useEffect, type FC } from 'react';

import type { GoalModel } from '@/models/goals-model';

import GoalsList from './GoalsList';

import classes from '../style/goals.module.css';
import Button from '@/components/ui/button';
import useGoals from '../hooks/useGoals';
import useAddGoal from '../hooks/useAddGoal';
import useGoalActions from '../hooks/useGoalActions';

type Props = {
  goals: GoalModel[];
  year: number;
};

const Goals: FC<Props> = ({ goals: serverGoals, year }) => {
  const { goals, canChangeGoal, updateGoals } = useGoals({ year });
  const { isShowAddGoal, isShowAddGoalButton, updateIsShowAddGoal } = useAddGoal({ year });
  const { isLoading, create, remove, updateCompleted, updateName } = useGoalActions({
    canChangeGoal,
    goals,
    year,
    updateGoals,
  });

  useEffect(() => {
    updateGoals(serverGoals);
  }, [serverGoals, updateGoals]);

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
            Add goal
          </Button>
        </div>
      )}
    </section>
  );
};

export default Goals;

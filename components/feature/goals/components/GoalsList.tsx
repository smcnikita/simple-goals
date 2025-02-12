'use client';

import { useMemo, type FC } from 'react';

import type { GoalModel } from '@/models/goals-model';

import GoalsItem from './GoalsItem';

import classes from '../style/goals.module.css';

type Props = {
  goals: GoalModel[];
  canChangeGoal: boolean;
};

const GoalsList: FC<Props> = ({ goals, canChangeGoal }) => {
  const uncompletedGoals = useMemo(() => {
    return goals.filter((goal) => !goal.is_completed && goal.completed_at === null);
  }, [goals]);

  const completedGoals = useMemo(() => {
    return goals
      .filter((goal) => goal.is_completed && goal.completed_at !== null)
      .sort((a, b) => new Date(a.completed_at!).getTime() - new Date(b.completed_at!).getTime());
  }, [goals]);

  return (
    <div className={classes.items}>
      <ul className={classes.list}>
        {uncompletedGoals.map((goal) => (
          <GoalsItem key={goal.id} goal={goal} canChangeGoal={canChangeGoal} />
        ))}
      </ul>

      <div className={classes.items_wrapper}>
        <p className={classes.items_title}>Completed</p>
        <ul className={classes.list}>
          {completedGoals.map((goal) => (
            <GoalsItem key={goal.id} goal={goal} canChangeGoal={canChangeGoal} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GoalsList;

import type { FC } from 'react';

import type { GoalModel } from '@/models/goals-model';

import GoalsList from './GoalsList';

import classes from '../style/goals.module.css';

type Props = {
  goals: GoalModel[];
  year: number;
};

const Goals: FC<Props> = ({ goals, year }) => {
  const currentYear = new Date().getFullYear();
  const canChangeGoal = year === currentYear;

  if (goals.length === 0) {
    return (
      <section className={classes.section}>
        <p className={classes.noGoals}>No goals yet</p>
      </section>
    );
  }

  return (
    <section className={classes.section}>
      <GoalsList goals={goals} canChangeGoal={canChangeGoal} />
    </section>
  );
};

export default Goals;

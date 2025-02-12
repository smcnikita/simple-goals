import type { FC } from 'react';

import type { GoalModel } from '@/models/goals-model';

import GoalsList from './GoalsList';

import classes from '../style/goals.module.css';

type Props = {
  goals: GoalModel[];
};

const Goals: FC<Props> = ({ goals }) => {
  if (goals.length === 0) {
    return (
      <section className={classes.section}>
        <p className={classes.noGoals}>No goals yet</p>
      </section>
    );
  }

  return (
    <section className={classes.section}>
      <GoalsList goals={goals} />
    </section>
  );
};

export default Goals;

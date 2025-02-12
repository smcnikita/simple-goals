import type { FC } from 'react';

import type { GoalModel } from '@/models/goals-model';

import GoalsItem from './GoalsItem';

import classes from '../style/goals.module.css';

type Props = {
  goals: GoalModel[];
};

const GoalsList: FC<Props> = ({ goals }) => {
  return (
    <ul className={classes.list}>
      {goals.map((goal) => (
        <GoalsItem key={goal.id} goal={goal} />
      ))}
    </ul>
  );
};

export default GoalsList;

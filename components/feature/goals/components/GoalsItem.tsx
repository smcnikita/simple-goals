'use client';

import type { FC } from 'react';

import type { GoalModel } from '@/models/goals-model';

import classes from '../style/goals.module.css';

type Props = {
  goal: GoalModel;
};

const GoalsItem: FC<Props> = ({ goal }) => {
  const onChange = () => {};

  return (
    <li className={classes.item}>
      <label>
        <input type="checkbox" checked={goal.is_completed} onChange={onChange} />
        {goal.name}
      </label>
    </li>
  );
};

export default GoalsItem;

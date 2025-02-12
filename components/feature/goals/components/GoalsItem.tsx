'use client';

import type { FC } from 'react';

import type { GoalModel } from '@/models/goals-model';

import Checkbox from '@/components/ui/checkbox';

import classes from '../style/goals.module.css';

type Props = {
  goal: GoalModel;
};

const GoalsItem: FC<Props> = ({ goal }) => {
  const onChange = () => {};

  return (
    <li className={classes.item}>
      <Checkbox checked={goal.is_completed} onChange={onChange}>
        {goal.name}
      </Checkbox>
    </li>
  );
};

export default GoalsItem;

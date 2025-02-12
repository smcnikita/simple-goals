'use client';

import type { FC } from 'react';

import type { GoalModel } from '@/models/goals-model';

import Checkbox from '@/components/ui/checkbox';

import classes from '../style/goals.module.css';

type Props = {
  goal: GoalModel;
  canChangeGoal: boolean;
};

const GoalsItem: FC<Props> = ({ goal, canChangeGoal }) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!canChangeGoal) {
      return;
    }
  };

  return (
    <li className={classes.item}>
      <Checkbox
        checked={goal.is_completed}
        disabled={!canChangeGoal}
        name={`checkbox-${goal.id}`}
        id={`checkbox-${goal.id}`}
        onChange={onChange}
      >
        {goal.name}
      </Checkbox>
    </li>
  );
};

export default GoalsItem;

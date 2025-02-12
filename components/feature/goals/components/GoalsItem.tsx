'use client';

import type { FC } from 'react';

import type { GoalModel } from '@/models/goals-model';

import Checkbox from '@/components/ui/checkbox';

import classes from '../style/goals.module.css';

type Props = {
  goal: GoalModel;
  canChangeGoal: boolean;
  updateGoal: (goalId: number, isCompleted: boolean) => Promise<void>;
};

const GoalsItem: FC<Props> = ({ goal, canChangeGoal, updateGoal }) => {
  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!canChangeGoal) {
      return;
    }

    await updateGoal(goal.id, event.target.checked);
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

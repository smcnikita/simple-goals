'use client';

import type { FC } from 'react';

import type { GoalModel } from '@/models/goals-model';

import Checkbox from '@/components/ui/checkbox';
import Button from '@/components/ui/button';
import BaseIcon, { EditPencilIcon, TrashIcon } from '@/components/ui/icon';

import classes from '../style/goals.module.css';
import clsx from 'clsx';

type Props = {
  goal: GoalModel;
  canChangeGoal: boolean;
  updateGoal: (goalId: number, isCompleted: boolean) => Promise<void>;
  removeGoal: (goalId: number) => Promise<void>;
};

const GoalsItem: FC<Props> = ({ goal, canChangeGoal, updateGoal, removeGoal }) => {
  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!canChangeGoal) {
      return;
    }

    await updateGoal(goal.id, event.target.checked);
  };

  return (
    <li
      className={clsx(classes.item, {
        [classes.canEdit]: canChangeGoal,
      })}
    >
      <Checkbox
        checked={goal.is_completed}
        disabled={!canChangeGoal}
        name={`checkbox-${goal.id}`}
        id={`checkbox-${goal.id}`}
        onChange={onChange}
      >
        {goal.name}
      </Checkbox>

      <div className={classes.item_actions}>
        <Button size="sm">
          <BaseIcon size="14">
            <EditPencilIcon />
          </BaseIcon>
        </Button>
        <Button size="sm" isButtonError onClick={async () => await removeGoal(goal.id)}>
          <BaseIcon size="14">
            <TrashIcon />
          </BaseIcon>
        </Button>
      </div>
    </li>
  );
};

export default GoalsItem;

'use client';

import { useState, type FC } from 'react';

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
  changeNameGoal: (goalId: number, newName: string) => Promise<void>;
};

const GoalsItem: FC<Props> = ({ goal, canChangeGoal, updateGoal, removeGoal, changeNameGoal }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newName, setNewName] = useState('');

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!canChangeGoal) {
      return;
    }

    await updateGoal(goal.id, event.target.checked);
  };

  const onRemove = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!canChangeGoal) {
      return;
    }

    await removeGoal(goal.id);
  };

  const onSave = async (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!canChangeGoal) {
      return;
    }

    await changeNameGoal(goal.id, newName);
    setIsEdit(false);
  };

  return (
    <li
      className={clsx(classes.item, {
        [classes.canEdit]: canChangeGoal,
      })}
    >
      {!isEdit && (
        <>
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
            <Button
              size="sm"
              onClick={() => {
                setNewName(goal.name);
                setIsEdit(true);
              }}
            >
              <BaseIcon size="14">
                <EditPencilIcon />
              </BaseIcon>
            </Button>
            <Button size="sm" isButtonError onClick={onRemove}>
              <BaseIcon size="14">
                <TrashIcon />
              </BaseIcon>
            </Button>
          </div>
        </>
      )}

      {isEdit && (
        <>
          <div className={classes.editWrapper}>
            <input
              className={classes.editInput}
              name={`edit-${goal.id}`}
              id={`edit-${goal.id}`}
              value={newName}
              type="text"
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  onSave(event);
                }
                if (event.key === 'Escape') {
                  setIsEdit(false);
                  setNewName('');
                }
              }}
            />

            <div className={classes.editActions}>
              <Button size="sm-2" onClick={onSave}>
                Save
              </Button>
              <Button
                size="sm-2"
                isButtonError
                onClick={() => {
                  setIsEdit(false);
                  setNewName('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </>
      )}
    </li>
  );
};

export default GoalsItem;

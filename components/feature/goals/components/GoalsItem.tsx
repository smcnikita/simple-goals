'use client';

import { useState, type FC } from 'react';
import clsx from 'clsx';

import type { GoalModel } from '@/models/goals-model';

import Checkbox from '@/components/ui/checkbox';
import Button from '@/components/ui/button';
import BaseIcon, { EditPencilIcon, TrashIcon } from '@/components/ui/icon';

import GoalsItemEdit from './edit/GoalsItemEdit';

import classes from '../style/goals.module.css';

type Props = {
  goal: GoalModel;
  canChangeGoal: boolean;

  remove: (goalId: number) => Promise<void>;
  updateCompleted: (goalId: number, isCompleted: boolean) => Promise<void>;
  updateName: (goalId: number, newName: string) => Promise<void>;
};

const GoalsItem: FC<Props> = ({ canChangeGoal, goal, remove, updateCompleted, updateName }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newName, setNewName] = useState('');

  const updateNewName = (value: string) => setNewName(value);

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!canChangeGoal) {
      return;
    }

    await updateCompleted(goal.id, event.target.checked);
  };

  const onRemove = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!canChangeGoal) {
      return;
    }

    await remove(goal.id);
  };

  const onSave = async (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!canChangeGoal) {
      return;
    }

    await updateName(goal.id, newName);
    setIsEdit(false);
  };

  const onKeyDownForEdit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSave(event);
    }
    if (event.key === 'Escape') {
      setIsEdit(false);
      setNewName('');
    }
  };

  const onSaveForEdit = async (e: React.MouseEvent<HTMLButtonElement>) => await onSave(e);

  const onCancelForEdit = () => {
    setIsEdit(false);
    setNewName('');
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
          <GoalsItemEdit
            value={newName}
            updateValue={updateNewName}
            onKeyDown={onKeyDownForEdit}
            onSave={onSaveForEdit}
            onCancel={onCancelForEdit}
          />
        </>
      )}
    </li>
  );
};

export default GoalsItem;

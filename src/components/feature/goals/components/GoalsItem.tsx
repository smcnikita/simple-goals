'use client';

import { useState, useCallback, type FC } from 'react';
import clsx from 'clsx';

import type { GoalModel } from '@/models/goals-model';

import Checkbox from '@/components/ui/checkbox';
import Button from '@/components/ui/button';
import BaseIcon, { TrashIcon } from '@/components/ui/icon';

import GoalsItemEdit from './edit/GoalsItemEdit';

import classes from '../style/goals.module.css';
import { GoalModalSaveParams } from '../types';

type Props = {
  goal: GoalModel;
  canChangeGoal: boolean;
  isLoading: boolean;

  remove: (goalId: number) => Promise<void>;
  updateCompleted: (goalId: number, isCompleted: boolean) => Promise<void>;
  updateName: (goalId: number, newName: string) => Promise<void>;

  handleOpenModal: (goal: GoalModalSaveParams) => void;
};

const GoalsItem: FC<Props> = ({
  canChangeGoal,
  goal,
  isLoading,
  remove,
  updateCompleted,
  updateName,
  handleOpenModal,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newName, setNewName] = useState('');

  const handleChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      event.stopPropagation();

      if (!canChangeGoal) return;
      await updateCompleted(goal.id, event.target.checked);
    },
    [canChangeGoal, goal.id, updateCompleted]
  );

  const handleRemove = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();

      if (!canChangeGoal) return;
      await remove(goal.id);
    },
    [canChangeGoal, goal.id, remove]
  );

  const handleSave = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {
      event.preventDefault();
      event.stopPropagation();

      if (!canChangeGoal) return;
      await updateName(goal.id, newName);
      setIsEdit(false);
    },
    [canChangeGoal, goal.id, newName, updateName]
  );

  const handleKeyDown = useCallback(
    async (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        await handleSave(event);
      }
      if (event.key === 'Escape') {
        setIsEdit(false);
        setNewName('');
      }
    },
    [handleSave]
  );

  const handleCancel = useCallback(() => {
    setIsEdit(false);
    setNewName('');
  }, []);

  return (
    <li
      className={clsx(classes.item, {
        [classes.canEdit]: canChangeGoal,
        [classes.isChecked]: goal.is_completed,
      })}
    >
      {isEdit ? (
        <GoalsItemEdit
          value={newName}
          isLoading={isLoading}
          updateValue={setNewName}
          onKeyDown={handleKeyDown}
          onSave={handleSave}
          onCancel={handleCancel}
          onRemove={handleRemove}
        />
      ) : (
        <>
          <div className={classes.checkbox_wrapper}>
            <Checkbox
              checked={goal.is_completed}
              disabled={!canChangeGoal || isLoading}
              name={`checkbox-${goal.id}`}
              id={`checkbox-${goal.id}`}
              useLabel={false}
              onChange={handleChange}
              style={{ width: '24px', height: '24px' }}
            />
            <button
              type="button"
              className={classes.goalAction}
              disabled={!canChangeGoal || isLoading}
              onClick={() =>
                handleOpenModal({
                  id: goal.id,
                  name: goal.name,
                  isCompleted: goal.is_completed,
                  description: goal.description,
                })
              }
            >
              {goal.name}
            </button>
          </div>

          <div className={classes.item_actions}>
            <Button size="sm" isButtonError onClick={handleRemove} disabled={!canChangeGoal || isLoading}>
              <BaseIcon size="14">
                <TrashIcon />
              </BaseIcon>
            </Button>
          </div>
        </>
      )}
    </li>
  );
};

export default GoalsItem;

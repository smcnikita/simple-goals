'use client';

import { useState, useCallback, type FC } from 'react';
import clsx from 'clsx';

import type { GoalModel } from '@/models/goals-model';

import Checkbox from '@/components/ui/checkbox';
import Button from '@/components/ui/button';
import BaseIcon, { TrashIcon } from '@/components/ui/icon';

import GoalsItemEdit from './edit/GoalsItemEdit';

import type { GoalModalSaveParams, RemoveGoalProps, UpdateCompletedProps, UpdateNameGoalProps } from '../types';

import cl from '../style/goals.module.css';

type Props = {
  goal: GoalModel;
  canChangeGoal: boolean;
  isLoading: boolean;

  remove: RemoveGoalProps;
  updateCompleted: UpdateCompletedProps;
  updateName: UpdateNameGoalProps;

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

  const onChangeCheckbox = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      event.stopPropagation();

      if (!canChangeGoal) return;
      await updateCompleted(goal.id, event.target.checked);
    },
    [canChangeGoal, goal.id, updateCompleted]
  );

  const onRemove = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();

      if (!canChangeGoal) return;
      await remove(goal.id);
    },
    [canChangeGoal, goal.id, remove]
  );

  const onUpdateNameGoal = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {
      event.preventDefault();
      event.stopPropagation();

      if (!canChangeGoal) {
        return;
      }

      await updateName(goal.id, newName);

      setIsEdit(false);
    },
    [canChangeGoal, goal.id, newName, updateName]
  );

  const onKeyDown = useCallback(
    async (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        await onUpdateNameGoal(event);
      }
      if (event.key === 'Escape') {
        setIsEdit(false);
        setNewName('');
      }
    },
    [onUpdateNameGoal]
  );

  const onCancel = () => {
    setIsEdit(false);
    setNewName('');
  };

  return (
    <li
      className={clsx(cl.item, {
        [cl.canEdit]: canChangeGoal,
        [cl.isChecked]: goal.is_completed,
      })}
    >
      {isEdit ? (
        <GoalsItemEdit
          value={newName}
          isLoading={isLoading}
          updateValue={setNewName}
          onKeyDown={onKeyDown}
          onSave={onUpdateNameGoal}
          onCancel={onCancel}
          onRemove={onRemove}
        />
      ) : (
        <>
          <div className={cl.checkbox_wrapper}>
            <Checkbox
              checked={goal.is_completed}
              disabled={!canChangeGoal || isLoading}
              name={`checkbox-${goal.id}`}
              id={`checkbox-${goal.id}`}
              useLabel={false}
              onChange={onChangeCheckbox}
              style={{ width: '24px', height: '24px' }}
            />
            <button
              type="button"
              className={cl.goalAction}
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

          <div className={cl.item_actions}>
            <Button size="sm" isButtonError onClick={onRemove} disabled={!canChangeGoal || isLoading}>
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

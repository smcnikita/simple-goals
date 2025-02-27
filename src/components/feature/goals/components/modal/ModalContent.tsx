'use client';

import { useEffect, useState, type FC } from 'react';
import clsx from 'clsx';

import Checkbox from '@/components/ui/checkbox';
import Button from '@/components/ui/button';

import type { GoalModalSaveParams } from '../../types';

import cl from './modal-content.module.css';
import clGoals from '../../style/goals.module.css';

type Props = {
  goalData: GoalModalSaveParams | null;
  canChangeGoal: boolean;
  isLoading: boolean;

  handleSave: (id: number, name: string) => Promise<void>;
  handleCancel: () => void;
  updateCompleted: (goalId: number, isCompleted: boolean) => Promise<void>;
};

const ModalContent: FC<Props> = ({ goalData, canChangeGoal, isLoading, handleSave, handleCancel, updateCompleted }) => {
  const [data, setData] = useState<GoalModalSaveParams | null>(null);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    setData(goalData);
    setNewName(goalData ? goalData.name : '');
  }, [goalData]);

  const handleSaveGoal = async () => {
    if (data) {
      await handleSave(data.id, newName);
    }
  };

  if (!data) {
    return null;
  }

  return (
    <div className={cl.content}>
      {/* Checkbox */}
      <div className={cl.blockCheckbox}>
        <Checkbox
          name="checkbox-edit-goal"
          id="checkbox-edit-goal"
          checked={data.isCompleted}
          disabled={!canChangeGoal || isLoading}
          useLabel={false}
          onChange={async (e) => await updateCompleted(data.id, e.target.checked)}
          style={{ width: '24px', height: '24px' }}
        />
        <input
          type="text"
          value={newName}
          disabled={!canChangeGoal || isLoading}
          onChange={(e) => setNewName(e.target.value)}
          className={clsx(clGoals.editInput, cl.blockCheckbox_text)}
        />
      </div>

      {/* Description */}
      <div className={cl.blockDescription}>
        <p className={cl.subtitle}>Описание</p>
        <textarea
          name="goal-edit-description"
          id="goal-edit-description"
          rows={10}
          className={clGoals.editInput}
          defaultValue={
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium vel nobis architecto quaerat? Recusandae temporibus perspiciatis ad doloremque itaque facilis! Maiores quis quos consequuntur recusandae minima nobis itaque, dignissimos blanditiis.'
          }
        />
      </div>

      <div className={cl.blockActions}>
        <Button type="button" size="sm-2" isButtonError disabled={!canChangeGoal || isLoading} onClick={handleCancel}>
          Отменить
        </Button>
        <Button
          type="button"
          size="sm-2"
          disabled={!canChangeGoal || isLoading}
          onClick={async () => await handleSaveGoal()}
        >
          Сохранить
        </Button>
      </div>
    </div>
  );
};

export default ModalContent;

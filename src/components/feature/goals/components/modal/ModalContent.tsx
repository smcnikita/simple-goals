'use client';

import { useEffect, useState, type FC } from 'react';
import clsx from 'clsx';
import TextareaAutosize from 'react-textarea-autosize';

import Checkbox from '@/components/ui/checkbox';
import Button from '@/components/ui/button';

import type { GoalModalSaveParams, RemoveGoalProps, UpdateCompletedProps, UpdateGoalProps } from '../../types';

import cl from './modal-content.module.css';
import cl_goals from '../../style/goals.module.css';
import { useTranslations } from 'next-intl';

type Props = {
  goalData: GoalModalSaveParams | null;
  canChangeGoal: boolean;
  isLoading: boolean;
  handleSave: UpdateGoalProps;
  handleCancel: () => void;
  updateCompleted: UpdateCompletedProps;
  onRemove: RemoveGoalProps;
};

const ModalContent: FC<Props> = ({
  goalData,
  canChangeGoal,
  isLoading,
  handleSave,
  handleCancel,
  updateCompleted,
  onRemove,
}) => {
  const t = useTranslations('Goals');

  const [data, setData] = useState<GoalModalSaveParams | null>(null);
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');

  useEffect(() => {
    setData(goalData);

    if (goalData) {
      setNewName(goalData.name);
      setNewDescription(goalData.description ? goalData.description : '');
    }
  }, [goalData]);

  const handleSaveGoal = async () => {
    if (data) {
      await handleSave(data.id, newName, newDescription);
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
          style={{ width: '24px', height: '24px', alignSelf: 'flex-start' }}
        />
        <TextareaAutosize
          style={{ resize: 'none' }}
          value={newName}
          disabled={!canChangeGoal || isLoading}
          onChange={(e) => setNewName(e.target.value)}
          className={clsx(cl_goals.editInput, cl.blockCheckbox_text)}
        />
      </div>

      {/* Description */}
      <div className={cl.blockDescription}>
        <p className={cl.subtitle}>{t('description')}</p>
        <TextareaAutosize
          name="goal-edit-description"
          id="goal-edit-description"
          style={{ resize: 'none' }}
          className={cl_goals.editInput}
          value={newDescription}
          placeholder={t('enterDescription')}
          onChange={(e) => setNewDescription(e.target.value)}
        />
      </div>

      <div className={cl.blockActions}>
        <Button
          type="button"
          size="sm-2"
          isButtonError
          disabled={!canChangeGoal || isLoading}
          onClick={async () => await onRemove(data.id)}
        >
          {t('remove')}
        </Button>
        <Button type="button" size="sm-2" isButtonError disabled={!canChangeGoal || isLoading} onClick={handleCancel}>
          {t('cancel')}
        </Button>
        <Button
          type="button"
          size="sm-2"
          disabled={!canChangeGoal || isLoading}
          onClick={async () => await handleSaveGoal()}
        >
          {t('save')}
        </Button>
      </div>
    </div>
  );
};

export default ModalContent;

'use client';

import type { FC } from 'react';
import { useTranslations } from 'next-intl';

import BaseEditComponent from './BaseEditComponent';

type Props = {
  value: string;
  isLoading: boolean;
  updateValue: (value: string) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => Promise<void>;
  onSave: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  onCancel: () => void;
};

const GoalsItemEdit: FC<Props> = ({ value, isLoading, updateValue, onKeyDown, onSave, onCancel }) => {
  const t = useTranslations('Goals');

  return (
    <BaseEditComponent
      value={value}
      placeholder={t('enterGoal')}
      isLoading={isLoading}
      updateValue={updateValue}
      onKeyDown={onKeyDown}
      onSave={onSave}
      onCancel={onCancel}
    />
  );
};

export default GoalsItemEdit;

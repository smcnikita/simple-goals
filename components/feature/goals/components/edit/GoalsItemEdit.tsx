'use client';

import type { FC } from 'react';
import BaseEditComponent from './BaseEditComponent';

type Props = {
  value: string;
  updateValue: (value: string) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => Promise<void>;
  onSave: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  onCancel: () => void;
};

const EditItem: FC<Props> = ({ value, updateValue, onKeyDown, onSave, onCancel }) => {
  return (
    <BaseEditComponent
      value={value}
      updateValue={updateValue}
      onKeyDown={onKeyDown}
      onSave={onSave}
      onCancel={onCancel}
    />
  );
};

export default EditItem;

'use client';

import type { FC } from 'react';
import BaseEditComponent from './BaseEditComponent';

type Props = {
  value: string;
  updateValue: (value: string) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => Promise<void>;
  onSave: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  onCancel: () => void;
  onRemove: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
};

const EditItem: FC<Props> = ({ value, updateValue, onKeyDown, onSave, onCancel, onRemove }) => {
  return (
    <BaseEditComponent
      value={value}
      updateValue={updateValue}
      onKeyDown={onKeyDown}
      onSave={onSave}
      onCancel={onCancel}
      onRemove={onRemove}
    />
  );
};

export default EditItem;

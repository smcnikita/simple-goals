'use client';

import { useState, type FC } from 'react';
import BaseEditComponent from './BaseEditComponent';

type Props = {
  create: (name: string) => Promise<void>;
  updateIsAddNewGoal: (value: boolean) => void;
};

const AddNewGoal: FC<Props> = ({ create, updateIsAddNewGoal }) => {
  const [value, setValue] = useState('');
  const updateValue = (value: string) => setValue(value);

  const onSave = async (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!value) {
      return;
    }

    await create(value);

    setValue('');
    updateIsAddNewGoal(false);
  };

  const onCancel = () => {
    setValue('');
    updateIsAddNewGoal(false);
  };

  const onKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSave(event);
    }
    if (event.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <BaseEditComponent
      value={value}
      placeholder={'Enter goal'}
      updateValue={updateValue}
      onKeyDown={onKeyDown}
      onSave={onSave}
      onCancel={onCancel}
      isAddNew={true}
    />
  );
};

export default AddNewGoal;

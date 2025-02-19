'use client';

import { useEffect, useRef, type FC } from 'react';

import Button from '@/components/ui/button';
import BaseIcon, { CheckIcon, PlusIcon, TrashIcon } from '@/components/ui/icon';

import classes from '../../style/goals.module.css';

type Props = {
  value: string;
  placeholder?: string;
  isAddNew?: boolean;
  isLoading: boolean;
  updateValue: (value: string) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => Promise<void>;
  onSave: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  onCancel: () => void;
  onRemove?: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
};

const BaseEditComponent: FC<Props> = ({
  value,
  placeholder,
  isLoading,
  isAddNew = false,
  updateValue,
  onKeyDown,
  onSave,
  onCancel,
  onRemove,
}) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div className={classes.editWrapper}>
      <input
        ref={ref}
        className={classes.editInput}
        value={value}
        type="text"
        placeholder={placeholder}
        onChange={(e) => updateValue(e.target.value)}
        onKeyDown={async (e) => await onKeyDown(e)}
      />

      <div className={classes.editActions}>
        <Button size="sm-2" disabled={isLoading} onClick={async (e) => await onSave(e)}>
          {isAddNew ? (
            <>
              <BaseIcon size="20">
                <PlusIcon />
              </BaseIcon>
              Add
            </>
          ) : (
            <>
              <BaseIcon size="20">
                <CheckIcon />
              </BaseIcon>
              Save
            </>
          )}
        </Button>
        {!isAddNew && onRemove && (
          <Button
            size="sm-2"
            disabled={isLoading}
            onClick={async (e) => {
              await onRemove(e);
            }}
            className={classes.removeBtn}
          >
            <BaseIcon size="20">
              <TrashIcon />
            </BaseIcon>
            Remove
          </Button>
        )}

        <Button size="sm-2" isButtonError disabled={isLoading} onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default BaseEditComponent;

'use client';

import { useState, type FC, type PropsWithChildren } from 'react';
import { Clock, CircleCheck, CircleX, CirclePause } from 'lucide-react';
import clsx from 'clsx';

import { STATUS_KEYS } from '@/constants/status';
import { DESCRIPTION_SETTINGS_KEYS } from '@/constants/description-settings';

import { useGoalsStore } from '@/stores/goals-store';

import useGlobalYear from '@/hooks/use-global-year';
import useGoalYearSettings from '@/hooks/use-goal-year-settings';

import StatusItem from '../StatusItem';
import GoalsUpdateFormWrapper from './GoalsUpdateFormWrapper';
import GoalsItemFooter from './goals-item-footer';

import type { Description } from '@/types/form-goal.types';
import type { StatusKeys } from '@/types/status.types';
import type { DescriptionSettings } from '@/types/description-settings.type';

type Props = {
  id: number;
  name: string;
  description: Description | null;
  status: StatusKeys;
  descriptionSettings: DescriptionSettings;
  section_id: number | null;
};

const GoalItem: FC<PropsWithChildren<Props>> = (props) => {
  const { children, id, name, status, description, section_id } = props;

  const { deleteGoal: deleteGoalStore } = useGoalsStore();
  const { globalYear } = useGlobalYear();
  const { isCanEditPastGoals } = useGoalYearSettings();

  const [isEdit, setIsEdit] = useState(false);

  const updateIsEdit = (isEdit: boolean) => {
    if (!isCanEditPastGoals) {
      return;
    }
    setIsEdit(isEdit);
  };

  const openUpdateForm = () => {
    if (!isCanEditPastGoals) {
      return;
    }
    setIsEdit(true);
  };

  const deleteGoal = async () => {
    if (!isCanEditPastGoals) {
      return;
    }
    await deleteGoalStore(id, globalYear);
  };

  return (
    <div className="border border-gray-200 rounded flex items-start md:items-center gap-3 md:gap-1 justify-between flex-col md:flex-row px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
      {isEdit ? (
        <GoalsUpdateFormWrapper
          updateIsEdit={updateIsEdit}
          id={id}
          name={name}
          description={description}
          status={status}
          section_id={section_id}
        />
      ) : (
        <div className="flex items-center gap-3">
          <div>
            {status === STATUS_KEYS.InProgress && <Clock size={16} className="text-blue-500" />}
            {status === STATUS_KEYS.Completed && <CircleCheck size={16} className="text-green-700" />}
            {status === STATUS_KEYS.NotCompleted && <CircleX size={16} className="text-red-500" />}
            {status === STATUS_KEYS.Canceled && <CirclePause size={16} className="text-gray-500" />}
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="text-base font-medium">{children}</h3>
            <StatusItem status={status} />
            <p
              className={clsx('mt-1 text-xs text-gray-500', {
                hidden: props.descriptionSettings.value === DESCRIPTION_SETTINGS_KEYS.display_none,
                'line-clamp-3': props.descriptionSettings.value === DESCRIPTION_SETTINGS_KEYS.display_3_lines,
              })}
            >
              {description}
            </p>
          </div>
        </div>
      )}

      {isCanEditPastGoals && !isEdit && <GoalsItemFooter deleteGoal={deleteGoal} openUpdateForm={openUpdateForm} />}
    </div>
  );
};

export default GoalItem;

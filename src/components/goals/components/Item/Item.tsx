'use client';

import { useState, type FC, type PropsWithChildren } from 'react';
import { Clock, CircleCheck, CircleX, CirclePause } from 'lucide-react';
import clsx from 'clsx';

import { STATUS_KEYS } from '@/constants/status';
import { DESCRIPTION_SETTINGS_KEYS } from '@/constants/description-settings';

import { useGoalsStore } from '@/stores/goals-store';

import useGlobalYear from '@/hooks/use-global-year';
import useGoalYearSettings from '@/hooks/use-goal-year-settings';

import Footer from './Footer';
import UpdateWrapper from '../Form/UpdateWrapper';

import StatusItem from '../../../StatusItem';

import type { Description } from '@/types/goals/form';
import type { StatusKeys } from '@/types/status/status';
import type { DescriptionSettings } from '@/types/settings/description';

type Props = {
  id: number;
  name: string;
  description: Description | null;
  status: StatusKeys;
  descriptionSettings: DescriptionSettings;
  sectionId: number | null;
  completedAt?: Date | string | null;
};

const Item: FC<PropsWithChildren<Props>> = (props) => {
  const { children, id, name, status, description, sectionId } = props;

  const { deleteGoal: deleteGoalStore } = useGoalsStore();
  const { globalYear } = useGlobalYear();
  const { isCanEditPastGoals } = useGoalYearSettings();

  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

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
    setIsLoadingDelete(true);
    await deleteGoalStore(id, globalYear).finally(() => setIsLoadingDelete(false));
  };

  return (
    <div className="border border-gray-200 rounded flex items-start md:items-center gap-3 md:gap-1 justify-between flex-col md:flex-row px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
      {isEdit ? (
        <UpdateWrapper
          updateIsEdit={updateIsEdit}
          id={id}
          name={name}
          description={description}
          status={status}
          section_id={sectionId}
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
            <h3 className="text-base font-medium wrap-anywhere">{children ? children : <>null</>}</h3>
            <StatusItem status={status} completedAt={props.completedAt} />
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

      {isCanEditPastGoals && !isEdit && (
        <Footer isLoadingDelete={isLoadingDelete} deleteGoal={deleteGoal} openUpdateForm={openUpdateForm} />
      )}
    </div>
  );
};

export default Item;

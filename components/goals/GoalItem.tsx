'use client';

import { useState, type FC, type PropsWithChildren } from 'react';
import { Clock, CircleCheck, CircleX, CirclePause } from 'lucide-react';

import { FILTER_STATUS_KEYS } from '@/constants/status';

import { useGoalsStore } from '@/stores/goals-store';

import useGlobalYear from '@/hooks/use-global-year';
import useGoalYearSettings from '@/hooks/use-goal-year-settings';

import StatusItem from '../StatusItem';
import GoalsUpdateFormWrapper from './GoalsUpdateFormWrapper';
import GoalsItemFooter from './GoalsItemFooter';

import type { Description } from '@/types/form-goal.types';
import type { StatusKeys } from '@/types/status.types';

type Props = {
  id: number;
  name: string;
  description: Description | null;
  status: StatusKeys;
};

const GoalItem: FC<PropsWithChildren<Props>> = (props) => {
  const { children, id, name, status, description } = props;

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
    <div className="border border-gray-200 rounded flex items-start md:items-center gap-3 md:gap-1 justify-between flex-col md:flex-row px-4 py-3">
      {isEdit ? (
        <GoalsUpdateFormWrapper
          updateIsEdit={updateIsEdit}
          id={id}
          name={name}
          description={description}
          status={status}
        />
      ) : (
        <div className="flex items-center gap-3">
          <div>
            {status === FILTER_STATUS_KEYS.InProgress && <Clock size={16} className="text-blue-500" />}
            {status === FILTER_STATUS_KEYS.Completed && <CircleCheck size={16} className="text-green-700" />}
            {status === FILTER_STATUS_KEYS.NotCompleted && <CircleX size={16} className="text-red-500" />}
            {status === FILTER_STATUS_KEYS.Canceled && <CirclePause size={16} className="text-gray-500" />}
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="text-base font-medium">{children}</h3>
            <StatusItem status={status} />
            <p className="mt-1 text-xs line-clamp-6 text-gray-500">{description}</p>
          </div>
        </div>
      )}

      {isCanEditPastGoals && !isEdit && <GoalsItemFooter deleteGoal={deleteGoal} openUpdateForm={openUpdateForm} />}
    </div>
  );
};

export default GoalItem;

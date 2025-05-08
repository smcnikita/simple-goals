'use client';

import { useState, type FC, type PropsWithChildren } from 'react';
import { Clock, CircleCheck, CircleX, CirclePause, X } from 'lucide-react';
import { toast } from 'sonner';

import { STATUS } from '@/constants/statuses';

import { httpDeleteGoal, httpUpdateGoal } from '@/lib/http/goals.http';

import StatusItem from '../StatusItem';
import GoalsUpdateFormWrapper from './GoalsUpdateFormWrapper';
import GoalsItemFooter from './GoalsItemFooter';

import type { Status, Description, FormSchema } from '@/types/form-goal.types';
import type { StatusOptionItem } from '@/types/statuses.types';
import type { GoalsWithStatusItem } from '@/types/goals.types';

type Props = {
  id: number;
  name: string;
  description: Description | null;
  status: Status;
  year: number;
  statusOption: StatusOptionItem[];
  deleteGoals: (id: number) => void;
  updateGoals: (goal: GoalsWithStatusItem) => void;
};

const GoalItem: FC<PropsWithChildren<Props>> = (props) => {
  const { children, id, name, year, statusOption, status, description, deleteGoals, updateGoals } = props;

  const [isEdit, setIsEdit] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const updateIsEdit = (isEdit: boolean) => {
    setIsEdit(isEdit);
  };

  const openUpdateForm = () => {
    setIsEdit(true);
  };

  const onSubmitUpdateGoal = async (values: FormSchema) => {
    setIsLoadingUpdate(true);

    try {
      const res = await httpUpdateGoal({
        id,
        name: values.name,
        description: values.description ?? undefined,
        status: values.status,
        year,
      });
      updateGoals(res.data);
      updateIsEdit(false);
      toast.success('Goal updated', {
        icon: <CircleCheck size={16} className="text-green-700" />,
        action: {
          label: <X size={16} />,
          onClick: () => {},
        },
      });
    } catch (error: unknown) {
      toast.error('Error');
    } finally {
      setIsLoadingUpdate(false);
    }
  };

  const deleteGoal = async () => {
    setIsLoadingDelete(true);

    try {
      const res = await httpDeleteGoal({ id, year });
      deleteGoals(res.data.id);
      toast.success('Goal delete', {
        icon: <CircleCheck size={16} className="text-green-700" />,
        action: {
          label: <X size={16} />,
          onClick: () => {},
        },
      });
    } catch (error: unknown) {
      toast.error('Error');
    } finally {
      setIsLoadingDelete(false);
    }
  };

  return (
    <div className="border border-gray-200 rounded flex items-start md:items-center gap-3 md:gap-1 justify-between flex-col md:flex-row px-4 py-3">
      {isEdit ? (
        <GoalsUpdateFormWrapper
          isLoading={isLoadingUpdate}
          statusOption={statusOption}
          onSubmit={onSubmitUpdateGoal}
          updateIsEdit={updateIsEdit}
          id={id}
          name={name}
          description={description}
          status={status}
          year={year}
        />
      ) : (
        <div className="flex items-center gap-3">
          <div>
            {status === STATUS.InProgress && <Clock size={16} className="text-blue-500" />}
            {status === STATUS.Completed && <CircleCheck size={16} className="text-green-700" />}
            {status === STATUS.NotCompleted && <CircleX size={16} className="text-red-500" />}
            {status === STATUS.Canceled && <CirclePause size={16} className="text-gray-500" />}
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="text-base font-medium">{children}</h3>
            <StatusItem status={status} />
            <p className="mt-1 text-xs line-clamp-2 text-gray-500">{description}</p>
          </div>
        </div>
      )}

      {!isEdit && (
        <GoalsItemFooter isLoading={isLoadingDelete} deleteGoal={deleteGoal} openUpdateForm={openUpdateForm} />
      )}
    </div>
  );
};

export default GoalItem;

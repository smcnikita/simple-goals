'use client';

import { useState, type FC, type PropsWithChildren } from 'react';
import { Clock, CircleCheck, CircleX, CirclePause, SquarePen, Trash2, Loader2, X } from 'lucide-react';
import { toast } from 'sonner';

import { useIsMobile } from '@/hooks/use-mobile';

import { Button } from '@/components/ui/button';
import GoalForm from '@/components/goal-form/GoalForm';

import StatusItem from '../StatusItem';

import type { Status, Description, FormSchema } from '@/types/form-goal.types';

type Props = {
  status: Status;
  description: Description;
};

const GoalItem: FC<PropsWithChildren<Props>> = ({ children, status, description }) => {
  const isMobile = useIsMobile();

  const [isEdit, setIsEdit] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const onSubmit = async (values: FormSchema) => {
    console.log(values);
  };

  const updateGoal = async () => {
    setIsLoadingUpdate(true);

    setTimeout(() => {
      setIsEdit(false);
      setIsLoadingUpdate(false);
      toast.success('Goal updated', {
        icon: <CircleCheck size={16} className="text-green-700" />,
        action: {
          label: <X size={16} />,
          onClick: () => {},
        },
      });
    }, 2000);
  };

  const deleteGoal = async () => {
    setIsLoadingDelete(true);

    setTimeout(() => {
      setIsLoadingDelete(false);
      toast.success('Goal deleted', {
        icon: <CircleCheck size={16} className="text-green-700" />,
        action: {
          label: <X size={16} />,
          onClick: () => {},
        },
      });
    }, 2000);
  };

  return (
    <div className="border border-gray-200 rounded flex items-start md:items-center gap-3 md:gap-1 justify-between flex-col md:flex-row px-4 py-3">
      {isEdit ? (
        <GoalForm
          afterContent={
            <div className="flex items-center justify-between gap-1">
              <Button variant="outline" onClick={() => setIsEdit(false)} className="cursor-pointer">
                Cancel
              </Button>
              <Button
                type="submit"
                className="cursor-pointer"
                disabled={isLoadingUpdate}
                onClick={async () => await updateGoal()}
              >
                {!isLoadingUpdate && 'Update Goal'}
                {isLoadingUpdate && <Loader2 className="animate-spin" />}
              </Button>
            </div>
          }
          onSubmit={onSubmit}
        />
      ) : (
        <div className="flex items-center gap-3">
          <div>
            {status === 'In Progress' && <Clock size={16} className="text-blue-500" />}
            {status === 'Completed' && <CircleCheck size={16} className="text-green-700" />}
            {status === 'Not Completed' && <CircleX size={16} className="text-red-500" />}
            {status === 'Canceled' && <CirclePause size={16} className="text-gray-500" />}
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="text-base font-medium">{children}</h3>
            <StatusItem status={status} />
            <p className="mt-1 text-xs line-clamp-2 text-gray-500">{description}</p>
          </div>
        </div>
      )}

      {!isEdit && (
        <div className="flex items-center gap-3 md:gap-0">
          <Button
            size={isMobile ? 'default' : 'icon'}
            variant={isMobile ? 'secondary' : 'ghost'}
            className="cursor-pointer"
            onClick={() => setIsEdit(true)}
          >
            <SquarePen />
            {isMobile && 'Edit'}
          </Button>
          <Button
            size={isMobile ? 'default' : 'icon'}
            variant={isMobile ? 'secondary' : 'ghost'}
            className="cursor-pointer"
            disabled={isLoadingDelete}
            onClick={async () => await deleteGoal()}
          >
            {!isLoadingDelete && (
              <>
                <Trash2 />
                {isMobile && 'Delete'}
              </>
            )}

            {isLoadingDelete && <Loader2 className="animate-spin" />}
          </Button>
        </div>
      )}
    </div>
  );
};

export default GoalItem;

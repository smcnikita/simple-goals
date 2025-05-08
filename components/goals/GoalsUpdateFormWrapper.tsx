import { useMemo, type FC } from 'react';
import { Loader2 } from 'lucide-react';

import { useGoalsStore } from '@/stores/goals-store';

import useGlobalYear from '@/hooks/use-global-year';

import GoalForm from '@/components/goal-form/GoalForm';
import { Button } from '@/components/ui/button';

import type { Status, Description, FormSchema } from '@/types/form-goal.types';

type Props = {
  id: number;
  name: string;
  description: Description | null;
  status: Status;
  updateIsEdit: (isEdit: boolean) => void;
};

const GoalsUpdateFormWrapper: FC<Props> = (props) => {
  const { id, name, description, status, updateIsEdit } = props;

  const { isLoadingUpdate, updateGoal } = useGoalsStore();

  const oldGoalData = useMemo(() => {
    return {
      id,
      name,
      description,
      status,
    };
  }, [id, name, description, status]);

  const { globalYear } = useGlobalYear();

  const onSubmitUpdateGoal = async (values: FormSchema) => {
    if (!globalYear) {
      return;
    }

    await updateGoal({
      ...values,
      id,
      year: globalYear,
    });

    updateIsEdit(false);
  };

  const afterContent = (
    <div className="flex items-center justify-between gap-1">
      <Button type="button" variant="outline" className="cursor-pointer" onClick={() => updateIsEdit(false)}>
        Cancel
      </Button>
      <Button type="submit" className="cursor-pointer" disabled={isLoadingUpdate}>
        {isLoadingUpdate ? <Loader2 className="animate-spin" /> : 'Update Goal'}
      </Button>
    </div>
  );

  return (
    <GoalForm
      afterContent={afterContent}
      isUpdateGoals={true}
      oldGoalData={oldGoalData}
      onSubmit={onSubmitUpdateGoal}
    />
  );
};

export default GoalsUpdateFormWrapper;

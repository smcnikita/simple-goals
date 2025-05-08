import { useMemo, type FC } from 'react';
import { Loader2 } from 'lucide-react';

import GoalForm from '@/components/goal-form/GoalForm';
import { Button } from '@/components/ui/button';

import type { StatusOptionItem } from '@/types/statuses.types';
import type { Status, Description, FormSchema } from '@/types/form-goal.types';

type Props = {
  isLoading: boolean;
  statusOption: StatusOptionItem[];
  id: number;
  name: string;
  description: Description | null;
  status: Status;
  year: number;
  updateIsEdit: (isEdit: boolean) => void;
  onSubmit: (values: FormSchema) => Promise<void>;
};

const GoalsUpdateFormWrapper: FC<Props> = (props) => {
  const { isLoading, statusOption, id, name, description, status, year, updateIsEdit, onSubmit } = props;

  const oldGoalData = useMemo(() => {
    return {
      id,
      name,
      description,
      status,
      year,
    };
  }, [id, name, description, status, year]);

  const afterContent = (
    <div className="flex items-center justify-between gap-1">
      <Button type="button" variant="outline" className="cursor-pointer" onClick={() => updateIsEdit(false)}>
        Cancel
      </Button>
      <Button type="submit" className="cursor-pointer" disabled={isLoading}>
        {isLoading ? <Loader2 className="animate-spin" /> : 'Update Goal'}
      </Button>
    </div>
  );

  return (
    <GoalForm
      statusOption={statusOption}
      afterContent={afterContent}
      isUpdateGoals={true}
      oldGoalData={oldGoalData}
      onSubmit={onSubmit}
    />
  );
};

export default GoalsUpdateFormWrapper;

import { type FC } from 'react';
import { Loader2 } from 'lucide-react';

import GoalItem from './GoalItem';

import type { StatusOptionItem } from '@/types/statuses.types';
import type { GoalsWithStatus, GoalsWithStatusItem } from '@/types/goals.types';

type Props = {
  year: number;
  goals: GoalsWithStatus;
  isLoading: boolean;
  statusOption: StatusOptionItem[];
  deleteGoals: (id: number) => void;
  updateGoals: (goal: GoalsWithStatusItem) => void;
};

const GoalsList: FC<Props> = ({ year, goals, isLoading, statusOption, deleteGoals, updateGoals }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loader2 className="animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {goals.length === 0 && <p className="flex justify-center text-gray-400 text-sm">There are no goals</p>}

      {goals.length > 0 &&
        goals.map((goal) => (
          <GoalItem
            key={goal.id}
            id={goal.id}
            name={goal.name}
            description={goal.description}
            year={year}
            statusOption={statusOption}
            status={goal.status}
            deleteGoals={deleteGoals}
            updateGoals={updateGoals}
          >
            {goal.name}
          </GoalItem>
        ))}
    </div>
  );
};

export default GoalsList;

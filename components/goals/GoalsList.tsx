import { type FC } from 'react';
import { Loader2 } from 'lucide-react';

import GoalItem from './GoalItem';

import type { GoalsWithStatus } from '@/types/goals.types';
import { StatusOptionItem } from '@/types/statuses.types';

type Props = {
  goals: GoalsWithStatus;
  isLoading: boolean;
  statusOption: StatusOptionItem[];
};

const GoalsList: FC<Props> = ({ goals, isLoading, statusOption }) => {
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
          <GoalItem key={goal.id} statusOption={statusOption} status={goal.status} description={goal.description}>
            {goal.name}
          </GoalItem>
        ))}
    </div>
  );
};

export default GoalsList;

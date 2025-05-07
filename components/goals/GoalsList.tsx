import { type FC } from 'react';
import { Loader2 } from 'lucide-react';

import GoalItem from './GoalItem';

import type { Goals } from '@/types/goals.types';

type Props = {
  goals: Goals;
  isLoading: boolean;
};

const GoalsList: FC<Props> = ({ goals, isLoading }) => {
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
        goals.map((el) => (
          <GoalItem key={el.name} status={el.status} description={el.description}>
            {el.name}
          </GoalItem>
        ))}
    </div>
  );
};

export default GoalsList;

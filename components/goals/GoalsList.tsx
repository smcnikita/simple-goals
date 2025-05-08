'use client';

import { type FC } from 'react';
import { Loader2 } from 'lucide-react';

import { useGoalsStore } from '@/stores/goals-store';

import GoalItem from './GoalItem';

import type { GoalsWithStatus } from '@/types/goals.types';

type Props = {
  goals: GoalsWithStatus;
};

const GoalsList: FC<Props> = ({ goals }) => {
  const { isLoadingFetch } = useGoalsStore();

  if (isLoadingFetch) {
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
          <GoalItem key={goal.id} id={goal.id} name={goal.name} description={goal.description} status={goal.status}>
            {goal.name}
          </GoalItem>
        ))}
    </div>
  );
};

export default GoalsList;

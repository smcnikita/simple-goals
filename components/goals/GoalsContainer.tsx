import type { FC } from 'react';

import GoalItem from './GoalItem';

import type { GoalModelWithStatus } from '@/types/goals.types';
import type { DescriptionSettings } from '@/types/description-settings.type';

type Props = {
  goals: GoalModelWithStatus[];
  descriptionSettings: DescriptionSettings;
};

const GoalsContainer: FC<Props> = ({ goals, descriptionSettings }) => {
  if (goals.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      {goals.map((goal) => (
        <GoalItem
          key={goal.id}
          id={goal.id}
          name={goal.name}
          description={goal.description}
          status={goal.status}
          descriptionSettings={descriptionSettings}
          section_id={goal.section_id}
        >
          {goal.name}
        </GoalItem>
      ))}
    </div>
  );
};

export default GoalsContainer;

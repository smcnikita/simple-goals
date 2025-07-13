import type { FC } from 'react';

import Item from './Item/Item';

import type { GoalModelWithStatus } from '@/types/goals/goal';
import type { DescriptionSettings } from '@/types/settings/description';

type Props = {
  goals: GoalModelWithStatus[];
  descriptionSettings: DescriptionSettings;
};

const Container: FC<Props> = ({ goals, descriptionSettings }) => {
  if (goals.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      {goals.map((goal) => (
        <Item
          key={goal.id}
          id={goal.id}
          name={goal.name}
          description={goal.description}
          status={goal.status}
          descriptionSettings={descriptionSettings}
          section_id={goal.section_id}
        >
          {goal.name}
        </Item>
      ))}
    </div>
  );
};

export default Container;

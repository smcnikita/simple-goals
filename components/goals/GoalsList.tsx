'use client';

import { type FC } from 'react';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useGoalsStore } from '@/stores/goals-store';

import GoalItem from './goal-item';

import type { GoalModelWithStatus } from '@/types/goals.types';
import type { DescriptionSettings } from '@/types/description-settings.type';

type Props = {
  goals: GoalModelWithStatus[];
  descriptionSettings: DescriptionSettings;
};

const GoalsList: FC<Props> = ({ goals, descriptionSettings }) => {
  const t = useTranslations('goals_list');

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
      {goals.length === 0 && <p className="flex justify-center text-gray-400 text-sm">{t('no_goals')}</p>}

      {goals.length > 0 &&
        goals.map((goal) => (
          <GoalItem
            key={goal.id}
            id={goal.id}
            name={goal.name}
            description={goal.description}
            status={goal.status}
            descriptionSettings={descriptionSettings}
          >
            {goal.name}
          </GoalItem>
        ))}
    </div>
  );
};

export default GoalsList;

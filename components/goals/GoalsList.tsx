'use client';

import { useMemo, type FC } from 'react';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useGoalsStore } from '@/stores/goals-store';
import GoalItem from './goal-item';

import type { GoalModelWithStatus } from '@/types/goals.types';
import type { DescriptionSettings } from '@/types/description-settings.type';

type Props = {
  goals: GoalModelWithStatus[];
  sectionGoals: Record<number, GoalModelWithStatus[]>;
  descriptionSettings: DescriptionSettings;
  goalsCount: number;
};

const GoalsList: FC<Props> = ({ goals, descriptionSettings, goalsCount, sectionGoals }) => {
  const t = useTranslations('goals_list');
  const { isLoadingFetch, sections } = useGoalsStore();

  const sectionsWithGoals = useMemo(() => {
    const sectionMap = new Map(sections.map((s) => [s.id, s.name]));

    return Object.entries(sectionGoals)
      .filter(([sectionId]) => sectionMap.has(Number(sectionId)))
      .map(([sectionId, goals]) => ({
        section_id: Number(sectionId),
        section_name: sectionMap.get(Number(sectionId))!,
        goals,
      }));
  }, [sectionGoals, sections]);

  if (isLoadingFetch) {
    return (
      <div className="flex justify-center">
        <Loader2 className="animate-spin text-gray-400" />
      </div>
    );
  }

  if (goalsCount === 0) {
    return <p className="flex justify-center text-gray-400 text-sm">{t('no_goals')}</p>;
  }

  return (
    <div className="space-y-6">
      {goals.length > 0 && (
        <div className="space-y-2">
          {goals.map((goal) => (
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
      )}

      {sectionsWithGoals.map((section) => (
        <div key={section.section_id} className="space-y-2">
          <h2 className="text-lg font-semibold mb-2">{section.section_name}</h2>
          <div className="space-y-2">
            {section.goals.map((goal) => (
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
        </div>
      ))}
    </div>
  );
};

export default GoalsList;

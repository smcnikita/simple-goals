'use client';

import { useMemo, type FC } from 'react';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useGoalsStore } from '@/stores/goals-store';

import Container from './Container';

import { List as SectionList } from '@/components/sections';

import type { GoalModelWithStatus } from '@/types/goals/goal';
import type { DescriptionSettings } from '@/types/settings/description';

type Props = {
  goals: GoalModelWithStatus[];
  sectionGoals: Record<number, GoalModelWithStatus[]>;
  descriptionSettings: DescriptionSettings;
  goalsCount: number;
};

const List: FC<Props> = ({ goals, descriptionSettings, goalsCount, sectionGoals }) => {
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
      {/* Goals without sections */}
      <Container goals={goals} descriptionSettings={descriptionSettings} />

      {/* Goals with sections */}
      <SectionList descriptionSettings={descriptionSettings} sectionsWithGoals={sectionsWithGoals} />
    </div>
  );
};

export default List;

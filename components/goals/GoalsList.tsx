'use client';

import { useMemo, useState, type FC } from 'react';
import { Loader2, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useGoalsStore } from '@/stores/goals-store';

import { Button } from '../ui/button';

import SectionUpdate from '../section-update/section-update';
import GoalItem from './goal-item';

import type { GoalModelWithStatus } from '@/types/goals.types';
import type { DescriptionSettings } from '@/types/description-settings.type';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogDescription,
} from '../ui/alert-dialog';
import useGlobalYear from '@/hooks/use-global-year';

type Props = {
  goals: GoalModelWithStatus[];
  sectionGoals: Record<number, GoalModelWithStatus[]>;
  descriptionSettings: DescriptionSettings;
  goalsCount: number;
};

const GoalsList: FC<Props> = ({ goals, descriptionSettings, goalsCount, sectionGoals }) => {
  const t = useTranslations('goals_list');
  const { isLoadingFetch, sections, deleteSection, isLoadingDeleteSection, updateSection } = useGoalsStore();
  const { globalYear } = useGlobalYear();

  const [isEditSection, setIsEditSection] = useState(false);

  const handleUpdateSection = async (sectionId: number, name: string) => {
    await updateSection(sectionId, globalYear, name);
    setIsEditSection(false);
  };

  const closeEditSection = () => {
    setIsEditSection(false);
  };

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
              section_id={goal.section_id}
            >
              {goal.name}
            </GoalItem>
          ))}
        </div>
      )}

      {sectionsWithGoals.map((section) => (
        <div key={section.section_id} className="space-y-2">
          {isEditSection ? (
            <SectionUpdate
              name={section.section_name}
              sectionId={section.section_id}
              closeEditSection={closeEditSection}
              updateSection={handleUpdateSection}
            />
          ) : (
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                className="text-lg font-semibold px-1"
                onClick={() => {
                  if (!isLoadingDeleteSection) {
                    setIsEditSection(true);
                  }
                }}
              >
                {section.section_name}
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="transition-opacity duration-200"
                    disabled={isLoadingDeleteSection}
                  >
                    {isLoadingDeleteSection ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <Trash2 size={12} className="text-gray-400" />
                    )}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{t('are_you_sure_section')}</AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogDescription>{t('section_description')}</AlertDialogDescription>

                  <AlertDialogFooter>
                    <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteSection(section.section_id, globalYear)}>
                      {t('short_delete_goal')}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
          <div className="space-y-2">
            {section.goals.map((goal) => (
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
        </div>
      ))}
    </div>
  );
};

export default GoalsList;

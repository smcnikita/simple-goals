'use client';

import type { FC } from 'react';
import { Trash2, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import useGlobalYear from '@/hooks/use-global-year';

import { useGoalsStore } from '@/stores/goals-store';

import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';

import type { SectionsWithGoalsItem } from '@/types/sections/section';

interface SectionActionsProps {
  section: SectionsWithGoalsItem;
  setIsEditSection: (value: boolean) => void;
}

const Actions: FC<SectionActionsProps> = ({ section, setIsEditSection }) => {
  const t = useTranslations('goals_list');
  const { globalYear } = useGlobalYear();
  const { deleteSection, isLoadingDeleteSection } = useGoalsStore();

  return (
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
  );
};

export default Actions;

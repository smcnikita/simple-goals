'use client';

import type { FC } from 'react';

import useGlobalYear from '@/hooks/use-global-year';

import { useGoalsStore } from '@/stores/goals-store';

import Actions from './Actions';
import UpdateForm from './Update/UpdateForm';

import type { SectionsWithGoalsItem } from '@/types/sections/section';

interface SectionHeaderProps {
  section: SectionsWithGoalsItem;
  isEditSection: boolean;
  closeEditSection: () => void;
  setIsEditSection: (value: boolean) => void;
}

const Header: FC<SectionHeaderProps> = ({ section, isEditSection, closeEditSection, setIsEditSection }) => {
  const { globalYear } = useGlobalYear();
  const { updateSection } = useGoalsStore();

  const handleUpdateSection = async (sectionId: number, name: string) => {
    await updateSection(sectionId, globalYear, name);
    setIsEditSection(false);
  };

  return isEditSection ? (
    <UpdateForm
      updateSection={handleUpdateSection}
      name={section.section_name}
      sectionId={section.section_id}
      closeEditSection={closeEditSection}
    />
  ) : (
    <Actions section={section} setIsEditSection={setIsEditSection} />
  );
};

export default Header;

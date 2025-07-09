'use client';

import type { FC } from 'react';

import useGlobalYear from '@/hooks/use-global-year';

import { useGoalsStore } from '@/stores/goals-store';

import SectionActions from './SectionActions';

import SectionUpdate from '@/components/section-update/SectionUpdate';

import type { sectionsWithGoalsItem } from '@/types/sections.type';

interface SectionHeaderProps {
  section: sectionsWithGoalsItem;
  isEditSection: boolean;
  closeEditSection: () => void;
  setIsEditSection: (value: boolean) => void;
}

const SectionHeader: FC<SectionHeaderProps> = ({ section, isEditSection, closeEditSection, setIsEditSection }) => {
  const { globalYear } = useGlobalYear();
  const { updateSection } = useGoalsStore();

  const handleUpdateSection = async (sectionId: number, name: string) => {
    await updateSection(sectionId, globalYear, name);
    setIsEditSection(false);
  };

  return isEditSection ? (
    <SectionUpdate
      updateSection={handleUpdateSection}
      name={section.section_name}
      sectionId={section.section_id}
      closeEditSection={closeEditSection}
    />
  ) : (
    <SectionActions section={section} setIsEditSection={setIsEditSection} />
  );
};

export default SectionHeader;

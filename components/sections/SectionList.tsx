'use client';

import type { FC } from 'react';

import SectionItem from './SectionItem';

import type { DescriptionSettings } from '@/types/description-settings.type';
import type { sectionsWithGoalsItem } from '@/types/sections.type';

interface SectionListProps {
  sectionsWithGoals: sectionsWithGoalsItem[];
  descriptionSettings: DescriptionSettings;
}

const SectionList: FC<SectionListProps> = ({ sectionsWithGoals, descriptionSettings }) => {
  return (
    <>
      {sectionsWithGoals.map((section) => (
        <SectionItem key={section.section_id} section={section} descriptionSettings={descriptionSettings} />
      ))}
    </>
  );
};

export default SectionList;

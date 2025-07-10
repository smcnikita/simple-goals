'use client';

import type { FC } from 'react';

import Item from './Item/Item';

import type { DescriptionSettings } from '@/types/description-settings.type';
import type { sectionsWithGoalsItem } from '@/types/sections.type';

interface SectionListProps {
  sectionsWithGoals: sectionsWithGoalsItem[];
  descriptionSettings: DescriptionSettings;
}

const List: FC<SectionListProps> = ({ sectionsWithGoals, descriptionSettings }) => {
  return (
    <>
      {sectionsWithGoals.map((section) => (
        <Item key={section.section_id} section={section} descriptionSettings={descriptionSettings} />
      ))}
    </>
  );
};

export default List;

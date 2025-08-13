'use client';

import type { FC } from 'react';

import Item from './Item/Item';

import type { DescriptionSettings } from '@/types/settings/description';
import type { SectionsWithGoalsItem } from '@/types/sections/section';

interface SectionListProps {
  sectionsWithGoals: SectionsWithGoalsItem[];
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

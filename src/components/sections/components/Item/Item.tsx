'use client';

import { useMemo, useState, type FC } from 'react';

import Header from '../Header';

import Container from '@/components/goals/components/Container';

import type { SectionsWithGoalsItem } from '@/types/sections/section';
import type { DescriptionSettings } from '@/types/settings/description';

interface SectionItemProps {
  section: SectionsWithGoalsItem;
  descriptionSettings: DescriptionSettings;
}

const Item: FC<SectionItemProps> = ({ section, descriptionSettings }) => {
  const [isEditSection, setIsEditSection] = useState(false);

  const closeEditSection = () => {
    setIsEditSection(false);
  };

  const goals = useMemo(() => {
    return section.goals;
  }, [section.goals]);

  return (
    <div className="space-y-2">
      <Header
        section={section}
        isEditSection={isEditSection}
        closeEditSection={closeEditSection}
        setIsEditSection={setIsEditSection}
      />

      {/* Goals List */}
      <Container goals={goals} descriptionSettings={descriptionSettings} />
    </div>
  );
};

export default Item;

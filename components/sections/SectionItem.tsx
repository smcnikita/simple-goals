'use client';

import { useMemo, useState, type FC } from 'react';

import SectionHeader from './SectionHeader';

import Container from '@/components/goals/components/Container';

import type { sectionsWithGoalsItem } from '@/types/sections.type';
import type { DescriptionSettings } from '@/types/description-settings.type';

interface SectionItemProps {
  section: sectionsWithGoalsItem;
  descriptionSettings: DescriptionSettings;
}

const SectionItem: FC<SectionItemProps> = ({ section, descriptionSettings }) => {
  const [isEditSection, setIsEditSection] = useState(false);

  const closeEditSection = () => {
    setIsEditSection(false);
  };

  const goals = useMemo(() => {
    return section.goals;
  }, [section.goals]);

  return (
    <div className="space-y-2">
      <SectionHeader
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

export default SectionItem;

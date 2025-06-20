'use client';

import { useState, type FC } from 'react';

import Goals from './goals';

import GoalsSetting from '@/components/goals-settings/goals-settings';

import type { DescriptionSettings } from '@/types/description-settings.type';

type Props = {
  year: number;
  descriptionSettings: DescriptionSettings[];
};

const GoalView: FC<Props> = ({ year, descriptionSettings }) => {
  const [isSettings, setIsSettings] = useState(false);

  const updateTab = () => {
    setIsSettings((prev) => !prev);
  };

  if (isSettings) {
    return <GoalsSetting year={year} descriptionSettings={descriptionSettings} updateTab={updateTab} />;
  }

  return (
    <div className="flex flex-col gap-6">
      <Goals globalYear={year} updateTab={updateTab} />
    </div>
  );
};

export default GoalView;

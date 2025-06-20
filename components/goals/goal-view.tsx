'use client';

import { useState, type FC } from 'react';

import Goals from './goals';

import GoalsSetting from '@/components/goals-settings/goals-settings';

type Props = {
  year: number;
};

const GoalView: FC<Props> = ({ year }) => {
  const [isSettings, setIsSettings] = useState(false);

  const updateTab = () => {
    setIsSettings((prev) => !prev);
  };

  if (isSettings) {
    return <GoalsSetting year={year} updateTab={updateTab} />;
  }

  return (
    <div className="flex flex-col gap-6">
      <Goals globalYear={year} updateTab={updateTab} />
    </div>
  );
};

export default GoalView;

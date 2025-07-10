'use client';

import { useState, type FC } from 'react';

import View from './View';
import Settings from './Settings';

import type { DescriptionSettings } from '@/types/description-settings.type';

type Props = {
  year: number;
  descriptionSettings: DescriptionSettings;
};

const Main: FC<Props> = ({ year, descriptionSettings }) => {
  const [isSettings, setIsSettings] = useState(false);

  const updateTab = () => {
    setIsSettings((prev) => !prev);
  };

  if (isSettings) {
    return <Settings year={year} updateTab={updateTab} />;
  }

  return (
    <div className="flex flex-col gap-6">
      <View globalYear={year} updateTab={updateTab} descriptionSettings={descriptionSettings} />
    </div>
  );
};

export default Main;

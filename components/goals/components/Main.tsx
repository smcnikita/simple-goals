'use client';

import { useEffect, useState, type FC } from 'react';

import { getPasswordFromLocalStorage } from '@/utils/cryptoHelper';

import { useGoalsStore } from '@/stores/goals-store';

import View from './View';
import Settings from './Settings';

import { Form } from '@/components/encryption';

import type { DescriptionSettings } from '@/types/settings/description';

type Props = {
  year: number;
  descriptionSettings: DescriptionSettings;
  isEncryptedGoals: boolean;
};

const Main: FC<Props> = ({ year, descriptionSettings, isEncryptedGoals }) => {
  const [isSettings, setIsSettings] = useState(false);

  const { isEncrypted, updateIsEncrypted } = useGoalsStore();

  const [isShowEncryption, setIsShowEncryption] = useState(true);

  const updateTab = () => {
    setIsSettings((prev) => !prev);
  };

  useEffect(() => {
    updateIsEncrypted(isEncryptedGoals);
  }, [isEncryptedGoals, updateIsEncrypted]);

  useEffect(() => {
    const password = getPasswordFromLocalStorage();

    if (isEncrypted && !password) {
      setIsShowEncryption(true);
    } else {
      setIsShowEncryption(false);
    }
  }, [isEncrypted]);

  if (isSettings) {
    return <Settings year={year} updateTab={updateTab} />;
  }

  if (isShowEncryption) {
    return <Form updateIsShowEncryption={setIsShowEncryption} />;
  }

  return (
    <div className="flex flex-col gap-6">
      <View globalYear={year} updateTab={updateTab} descriptionSettings={descriptionSettings} />
    </div>
  );
};

export default Main;

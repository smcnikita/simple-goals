'use client';

import { useEffect, useState, type FC } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { getPasswordFromLocalStorage, removePasswordToLocalStorage } from '@/utils/cryptoHelper';

import { Button } from '@/components/ui/button';

const Action: FC = () => {
  const t = useTranslations('encryption');

  const [isShowEncryption, setIsShowEncryption] = useState(false);

  const encryptGoals = () => {
    removePasswordToLocalStorage();
    setIsShowEncryption(false);
    toast.success(t('title.encrypted'));
  };

  useEffect(() => {
    const password = getPasswordFromLocalStorage();

    if (password) {
      setIsShowEncryption(true);
    }
  }, []);

  if (!isShowEncryption) {
    return null;
  }

  return (
    <Button type="button" variant="outline" onClick={encryptGoals}>
      {t('disableEncryption')}
    </Button>
  );
};

export default Action;

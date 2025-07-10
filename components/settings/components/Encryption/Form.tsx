'use client';

import { useEffect, useState, type FC } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { getPasswordFromLocalStorage, removePasswordToLocalStorage } from '@/utils/cryptoHelper';

import { Button } from '@/components/ui/button';
import { httpDecryptGoals } from '@/lib/http/encrypt-goals.http';

const Form: FC = () => {
  const t = useTranslations('encryption');

  const [isShowEncryption, setIsShowEncryption] = useState(false);

  const encryptGoals = () => {
    removePasswordToLocalStorage();
    setIsShowEncryption(false);
    toast.success(t('is_encrypted'));
  };

  const decryptGoals = async () => {
    removePasswordToLocalStorage();
    await httpDecryptGoals().then(() => {
      window.location.reload();
    });
  };

  useEffect(() => {
    const password = getPasswordFromLocalStorage();

    if (password) {
      setIsShowEncryption(true);
    }
  }, []);

  if (isShowEncryption) {
    return (
      <div className="w-2/3 space-y-6">
        <div>
          <Button type="button" onClick={encryptGoals}>
            {t('encrypt')}
          </Button>
        </div>

        <div>
          <Button type="button" onClick={decryptGoals}>
            {t('remove')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-2/3 space-y-6">
      <div>
        <Button type="button" onClick={decryptGoals}>
          {t('remove')}
        </Button>
      </div>
    </div>
  );
};

export default Form;

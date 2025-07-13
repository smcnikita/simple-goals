'use client';

import type { FC } from 'react';

import { DecryptionForm } from '@/components/decryption';
import { useTranslations } from 'next-intl';

type Props = {
  footer: React.ReactNode;
  isLoading: boolean;
  updateIsLoading: (isLoading: boolean) => void;
};

const Content: FC<Props> = ({ footer, isLoading, updateIsLoading }) => {
  const t = useTranslations('encryption');

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 text-sm">
          <p>
            <b className="text-destructive">{t('warningRemoveGoals')}</b>
          </p>
          <p>
            {t('encryptionInfo.1')} <b>{t('encryptionInfo.2')}</b> {t('encryptionInfo.3')}{' '}
            <b>{t('encryptionInfo.4')}</b> {t('encryptionInfo.5')} <b>{t('encryptionInfo.6')}</b>{' '}
            {t('encryptionInfo.7')}
          </p>
        </div>

        <DecryptionForm footer={footer} isLoading={isLoading} updateIsLoading={updateIsLoading} />
      </div>
    </>
  );
};

export default Content;

'use client';

import { useTranslations } from 'next-intl';
import type { FC } from 'react';

type Props = {
  footer: React.ReactNode;
};

const Content: FC<Props> = ({ footer }) => {
  const t = useTranslations('encryption');

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 text-sm">
        <p>
          <b className="text-destructive">{t('warningRemoveGoals')}</b>
        </p>
        <p>
          {t('disableEncryptionInfo.1')} <b>{t('disableEncryptionInfo.2')}</b> {t('disableEncryptionInfo.3')}
        </p>
      </div>

      {footer}
    </div>
  );
};

export default Content;

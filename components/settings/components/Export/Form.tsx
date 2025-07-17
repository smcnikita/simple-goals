'use client';

import type { FC } from 'react';
import { Download } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

const Form: FC = () => {
  const t = useTranslations('settings.export');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form noValidate onSubmit={onSubmit}>
      <Button type="submit" variant="ghost">
        <Download />
        {t('button')}
      </Button>
    </form>
  );
};

export default Form;

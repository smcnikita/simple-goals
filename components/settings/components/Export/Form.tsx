'use client';

import type { FC } from 'react';
import { Download } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { httpExportGetJson } from '@/lib/api/export/get-json';

import { Button } from '@/components/ui/button';

const Form: FC = () => {
  const t = useTranslations('settings.export');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = await httpExportGetJson();

    const blob = new Blob([JSON.stringify(data.data, null, 2)], {
      type: 'application/json',
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'goals-export.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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

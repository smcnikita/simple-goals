import type { FC } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

import GoalsSettingsContent from './goals-settings-content';

type Props = {
  year: number;
  updateTab: () => void;
};

const GoalsSettings: FC<Props> = ({ year, updateTab }) => {
  const t = useTranslations('settings');

  return (
    <div>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={updateTab}>
          <ArrowLeft />
        </Button>
        <h1 className="text-2xl font-bold">{t('goals_settings', { year })}</h1>
      </div>

      <GoalsSettingsContent />
    </div>
  );
};

export default GoalsSettings;

import type { FC, PropsWithChildren } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import LangSwitcher from '@/components/LangSwitcher';
import ThemeSwitcher from '@/components/ThemeSwitcher';

const BaseForm: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="absolute top-4 right-4 flex items-center gap-3 max-w-[144px]">
        <LangSwitcher />
        <ThemeSwitcher isHideText={true} />
      </div>

      <Card>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
};

export default BaseForm;

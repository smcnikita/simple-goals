'use client';

import { type FC } from 'react';
import { Moon, Sun, MoonStar } from 'lucide-react';

import { useThemeStore } from '@/stores/theme-store';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslations } from 'next-intl';

type Props = {
  isHideText?: boolean;
};

const ThemeSwitcher: FC<Props> = ({ isHideText = false }) => {
  const t = useTranslations('theme');

  const { theme, updateTheme } = useThemeStore();

  return (
    <Select value={theme} onValueChange={updateTheme}>
      <SelectTrigger className="w-full">
        <SelectValue>
          {theme === 'dark' && (
            <>
              <Moon />
              {!isHideText && t('dark')}
            </>
          )}
          {theme === 'light' && (
            <>
              <Sun />
              {!isHideText && t('light')}
            </>
          )}
          {theme === 'system' && (
            <>
              <MoonStar />
              {!isHideText && t('system')}
            </>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t('themes')}</SelectLabel>
          <SelectItem value="light">{t('light')}</SelectItem>
          <SelectItem value="dark">{t('dark')}</SelectItem>
          <SelectItem value="system">{t('system')}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ThemeSwitcher;

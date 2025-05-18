'use client';

import { useState, type FC } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';

import { type Locale, locales, localesInfo } from '@/i18n/config';

import { localeService } from '@/services/locale/locale.service';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const LangSwitcher: FC = () => {
  const locale = useLocale() as Locale;

  const [langValue, setLangValue] = useState<Locale>(locale);

  const onChangeLang = (value: Locale) => {
    setLangValue(value);
    localeService.setUserLocale(value);
  };

  return (
    <Select value={langValue} onValueChange={onChangeLang}>
      <SelectTrigger className="w-[66px] shrink-0">
        <SelectValue>
          <Image src={localesInfo[langValue].icon} alt={localesInfo[langValue].text} height={16} width={16} />
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {locales.map((lang) => (
            <SelectItem key={lang} value={lang}>
              <Image src={localesInfo[lang].icon} alt={localesInfo[lang].text} height={16} width={16} />
              {localesInfo[lang].text}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default LangSwitcher;

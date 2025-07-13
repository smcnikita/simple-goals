'use client';

import { useTranslations } from 'next-intl';
import { useMemo, useState, type FC } from 'react';

import { httpUpdateDescriptionSettings } from '@/lib/api/user';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import type { DescriptionSettings } from '@/types/description-settings.type';

type Props = {
  selected: DescriptionSettings;
  options: DescriptionSettings[];
};

const Form: FC<Props> = ({ selected, options }) => {
  const t = useTranslations('settings');
  const tComment = useTranslations('settings.comment.options');

  const [isLoading, setIsLoading] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState<DescriptionSettings>(selected);

  const selectedText = useMemo(() => {
    return tComment(selectedSetting.value);
  }, [selectedSetting.value, tComment]);

  const updateDisplayComment = async (selectedId: string) => {
    setIsLoading(true);

    const id = Number(selectedId);

    const comment = options.find((el) => el.id === id);

    if (!comment) {
      setIsLoading(false);
      return;
    }

    await httpUpdateDescriptionSettings(id)
      .then(({ data }) => {
        setSelectedSetting(data.description_settings);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm">{t('comment.goal_comment_display_setting')}</p>
      <Select value={selectedSetting.id.toString()} onValueChange={updateDisplayComment} disabled={isLoading}>
        <SelectTrigger className="shrink-0">
          <SelectValue>{selectedText}</SelectValue>
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.id} value={option.id.toString()}>
                {tComment(option.value)}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <p className="text-sm text-gray-500">{t('comment.goal_comment_display_control')}</p>
    </div>
  );
};

export default Form;

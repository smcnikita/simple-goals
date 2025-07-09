'use client';

import { useMemo, type FC } from 'react';
import { Check, X } from 'lucide-react';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useGoalsStore } from '@/stores/goals-store';

import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

type Props = {
  name: string;
  sectionId: number;
  closeEditSection: () => void;
  updateSection: (sectionId: number, name: string) => Promise<void>;
};

const SectionUpdate: FC<Props> = ({ name, sectionId, closeEditSection, updateSection }) => {
  const t = useTranslations('goals_list');
  const tErrors = useTranslations('errors');
  const { isLoadingUpdateSection } = useGoalsStore();

  const formSchema = useMemo(
    () =>
      z.object({
        name: z
          .string()
          .min(2, { message: tErrors('name.min', { min: 2 }) })
          .max(100, { message: tErrors('name.max', { max: 100 }) }),
      }),
    [tErrors]
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await updateSection(sectionId, values.name);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-end justify-between gap-1">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{t('section_name')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('enter_section')}
                    {...field}
                    onChange={(e) => field.onChange(capitalizeFirstLetter(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-end gap-1">
            <Button
              variant="outline"
              size="icon"
              type="button"
              disabled={isLoadingUpdateSection}
              onClick={closeEditSection}
            >
              <X />
            </Button>
            <Button
              variant="default"
              size="icon"
              type="submit"
              disabled={name === form.watch('name') || isLoadingUpdateSection}
            >
              <Check />
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SectionUpdate;

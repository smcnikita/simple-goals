'use client';

import { useMemo, type FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import useGlobalYear from '@/hooks/use-global-year';

import { httpCreateSection } from '@/lib/http/get-sections';

import { useGoalsStore } from '@/stores/goals-store';

import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';

import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type Props = {
  updateOpenDialog: (isOpen: boolean) => void;
};

const Dialog: FC<Props> = ({ updateOpenDialog }) => {
  const t = useTranslations('goals_list');
  const tErrors = useTranslations('errors');

  const { globalYear } = useGlobalYear();
  const { addSection } = useGoalsStore();

  const formSchema = useMemo(
    () =>
      z.object({
        name: z
          .string()
          .min(1, { message: tErrors('section_name.min', { min: 2 }) })
          .max(100, { message: tErrors('section_name.max', { max: 100 }) }),
      }),
    [tErrors]
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await httpCreateSection({
      name: values.name.trim(),
      year: globalYear,
    })
      .then(({ data }) => {
        addSection(data.section);
        toast.success(t('section_created'));
      })
      .catch(() => {
        toast.error(tErrors('section_create'));
      })
      .finally(() => {
        updateOpenDialog(false);
      });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{t('add_section')}</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full py-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('section')}</FormLabel>
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

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">{t('close')}</Button>
            </DialogClose>
            <Button type="submit" disabled={false}>
              {t('add_section')}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default Dialog;

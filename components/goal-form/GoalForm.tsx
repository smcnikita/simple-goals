'use client';

import { useMemo, type FC, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';

import { STATUS } from '@/constants/statuses';

import { useStatusStore } from '@/stores/status-store';

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import type { Status, Name, Description, FormSchema } from '@/types/form-goal.types';
import type { StatusKeys } from '@/types/statuses.types';

type OldGoalData = {
  id: number;
  name: Name;
  description: Description;
  status: Status;
};

type Props = {
  afterContent: ReactNode;
  isUpdateGoals?: boolean;
  oldGoalData?: OldGoalData;
  onSubmit: (values: FormSchema) => Promise<void>;
};

const DEFAULT_STATUS: StatusKeys = STATUS.InProgress;

const DEFAULT_GOAL_VALUES = {
  name: '',
  description: null,
  status: DEFAULT_STATUS,
};

const GoalForm: FC<Props> = (props) => {
  const { afterContent, onSubmit: handleSubmit, isUpdateGoals = false, oldGoalData } = props;

  const t = useTranslations('goals_list');
  const tErrors = useTranslations('errors');

  const formSchema = useMemo(
    () =>
      z.object({
        name: z
          .string()
          .min(2, { message: tErrors('name.min', { min: 2 }) })
          .max(100, { message: tErrors('name.max', { max: 100 }) }),

        description: z
          .string()
          .max(500, { message: tErrors('description.max', { max: 500 }) })
          .nullable(),

        status: z.enum([STATUS.InProgress, STATUS.Completed, STATUS.NotCompleted, STATUS.Canceled], {
          message: tErrors('status.invalid'),
        }),
      }),
    [tErrors]
  );

  const { statusOptions } = useStatusStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      isUpdateGoals && oldGoalData
        ? {
            name: oldGoalData.name,
            description: oldGoalData.description,
            status: oldGoalData.status,
          }
        : DEFAULT_GOAL_VALUES,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await handleSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('goal_title')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('enter_goal')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('status')}</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status.key} value={status.key}>
                        {t(status.key)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('comment')}</FormLabel>
                <FormControl>
                  <Textarea placeholder={t('add_comment')} rows={3} {...field} value={field.value ?? undefined} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {afterContent}
      </form>
    </Form>
  );
};

export default GoalForm;

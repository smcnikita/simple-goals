'use client';

import { useMemo, type FC, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { CircleCheck, CirclePause, CircleX, Clock } from 'lucide-react';

import { FILTER_STATUS_KEYS, STATUS_KEYS } from '@/constants/status';

import { useStatusStore } from '@/stores/status-store';
import { useGoalsStore } from '@/stores/goals-store';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Form as FormComponent,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';

import type { Name, Description, FormSchema } from '@/types/goals/form';
import type { StatusKeys } from '@/types/status/status';

type OldGoalData = {
  id: number;
  name: Name;
  description: Description;
  status: StatusKeys;
  section_id: number | null;
};

type Props = {
  afterContent: ReactNode;
  isUpdateGoals?: boolean;
  oldGoalData?: OldGoalData;
  onSubmit: (values: FormSchema) => Promise<void>;
};

const DEFAULT_STATUS: StatusKeys = FILTER_STATUS_KEYS.InProgress;

const DEFAULT_GOAL_VALUES = {
  name: '',
  description: null,
  status: DEFAULT_STATUS,
};

const Form: FC<Props> = (props) => {
  const { afterContent, onSubmit: handleSubmit, isUpdateGoals = false, oldGoalData } = props;

  const t = useTranslations('goals_list');
  const tErrors = useTranslations('errors');

  const { sections } = useGoalsStore();

  const sectionOptions = useMemo(() => {
    return sections.map((section) => ({
      value: section.id,
      label: section.name,
    }));
  }, [sections]);

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

        status: z.enum(
          [STATUS_KEYS.InProgress, STATUS_KEYS.Completed, STATUS_KEYS.NotCompleted, STATUS_KEYS.Canceled],
          {
            message: tErrors('status.invalid'),
          }
        ),

        section_id: z.string().nullable().optional(),
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
            section_id: oldGoalData.section_id === null ? undefined : oldGoalData.section_id.toString(),
          }
        : DEFAULT_GOAL_VALUES,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let section_id = values.section_id === undefined ? null : values.section_id;

    if (section_id === 'none') {
      section_id = null;
    }

    await handleSubmit({
      ...values,
      section_id: section_id ? Number(section_id) : null,
    });
  };

  return (
    <FormComponent {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full py-4">
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
            name="section_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('section')}</FormLabel>
                <Select
                  onValueChange={(val) => {
                    field.onChange(val === 'none' ? undefined : val);
                  }}
                  value={field.value ?? 'none'}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder={t('select_section')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">{t('select_section')}</SelectItem>
                    {sectionOptions.map((section) => (
                      <SelectItem key={section.value} value={String(section.value)}>
                        {section.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {field.value !== undefined && field.value !== 'none' && (
                  <FormDescription>
                    <Button className="pl-1" variant="link" type="button" onClick={() => field.onChange('none')}>
                      {t('clear_section')}
                    </Button>
                  </FormDescription>
                )}
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
                        {status.key === STATUS_KEYS.InProgress && <Clock size={16} className="text-blue-500" />}
                        {status.key === STATUS_KEYS.Completed && <CircleCheck size={16} className="text-green-700" />}
                        {status.key === STATUS_KEYS.NotCompleted && <CircleX size={16} className="text-red-500" />}
                        {status.key === STATUS_KEYS.Canceled && <CirclePause size={16} className="text-gray-500" />}
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
    </FormComponent>
  );
};

export default Form;

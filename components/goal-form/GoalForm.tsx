'use client';

import { type FC, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

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

const formSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().max(500).nullable(),
  status: z.enum([STATUS.InProgress, STATUS.Completed, STATUS.NotCompleted, STATUS.Canceled]),
});

const DEFAULT_STATUS: StatusKeys = STATUS.InProgress;

const DEFAULT_GOAL_VALUES = {
  name: '',
  description: null,
  status: DEFAULT_STATUS,
};

const GoalForm: FC<Props> = (props) => {
  const { afterContent, onSubmit: handleSubmit, isUpdateGoals = false, oldGoalData } = props;

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
                <FormLabel>Goal Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your goal" {...field} />
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
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Enter your goal" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status.key} value={status.key}>
                        {status.name}
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
                <FormLabel>Comment</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Add a comment or note about this goal"
                    rows={3}
                    {...field}
                    value={field.value ?? undefined}
                  />
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

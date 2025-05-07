'use client';

import type { FC, ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import type { FormSchema } from '@/types/form-goal.types';

type Props = {
  afterContent: ReactNode;
  onSubmit: (values: FormSchema) => Promise<void>;
};

const formSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().max(500),
  status: z.string(),
});

const DEFAULT_STATUS = 'In Progress';

const DEFAULT_GOAL_VALUES = {
  name: '',
  description: '',
  status: DEFAULT_STATUS,
};

const GoalForm: FC<Props> = ({ afterContent, onSubmit: handleSubmit }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: DEFAULT_GOAL_VALUES,
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
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Enter your goal" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Not Completed">Not Completed</SelectItem>
                      <SelectItem value="Canceled">Canceled</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
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
                  <Textarea placeholder="Add a comment or note about this goal" rows={3} {...field} />
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

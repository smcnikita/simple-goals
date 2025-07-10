'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useMemo, useState, type FC } from 'react';
import { toast } from 'sonner';

import { zodResolver } from '@hookform/resolvers/zod';

import { httpUpdateUserPassword } from '@/lib/http/update-user-password.http';

import { Button } from '@/components/ui/button';
import { Form as FormComponent, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const Form: FC = () => {
  const t = useTranslations();
  const tErrors = useTranslations('errors');
  const tSettings = useTranslations('user_settings');

  const [isLoading, setIsLoading] = useState(false);

  const registerSchema = useMemo(
    () =>
      z
        .object({
          password: z
            .string({
              required_error: tErrors('password.required'),
              invalid_type_error: tErrors('password.type'),
            })
            .min(8, tErrors('password.min', { min: 8 }))
            .max(100, tErrors('password.max', { max: 100 })),

          oldPassword: z
            .string({
              required_error: tErrors('password.required'),
              invalid_type_error: tErrors('password.type'),
            })
            .min(8, tErrors('password.min', { min: 8 }))
            .max(100, tErrors('password.max', { max: 100 })),

          passwordRepeat: z.string({
            required_error: tErrors('passwordRepeat.required'),
            invalid_type_error: tErrors('passwordRepeat.type'),
          }),
        })
        .refine((data) => data.password === data.passwordRepeat, {
          message: tErrors('passwordRepeat.match'),
          path: ['passwordRepeat'],
        }),
    [tErrors]
  );

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      password: '',
      oldPassword: '',
      passwordRepeat: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    await httpUpdateUserPassword(values.password, values.oldPassword)
      .then(() => {
        toast.success(tSettings('success_update_password'));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <FormComponent {...form}>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{tSettings('current_password')}</FormLabel>
              <FormControl>
                <Input className="max-w-[300px]" type="text" placeholder="********" disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{tSettings('new_password')}</FormLabel>
              <FormControl>
                <Input className="max-w-[300px]" type="text" placeholder="********" disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordRepeat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{tSettings('repeat_new_password')}</FormLabel>
              <FormControl>
                <Input className="max-w-[300px]" type="text" placeholder="********" disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {t('save')}
        </Button>
      </form>
    </FormComponent>
  );
};

export default Form;

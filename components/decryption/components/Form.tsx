'use client';

import { useMemo, type FC } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { savePasswordToLocalStorage } from '@/utils/cryptoHelper';

import { Form as FormComponent, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { httpEncryptGoals } from '@/lib/http/encrypt-goals.http';

type Props = {
  footer: React.ReactNode;
  isLoading: boolean;
  updateIsLoading: (isLoading: boolean) => void;
};

const Form: FC<Props> = ({ footer, isLoading, updateIsLoading }) => {
  const t = useTranslations('encryption');
  const tErrors = useTranslations('errors');

  const formSchema = useMemo(
    () =>
      z.object({
        password: z
          .string()
          .min(4, { message: tErrors('password_crypto.min', { min: 4 }) })
          .max(100, { message: tErrors('password_crypto.max', { max: 25 }) }),
      }),
    [tErrors]
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    updateIsLoading(true);
    const { password } = values;
    await httpEncryptGoals()
      .then(() => {
        savePasswordToLocalStorage(password);
        window.location.reload();
      })
      .finally(() => {
        updateIsLoading(false);
      });
  };

  return (
    <FormComponent {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('setPassword')}</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {footer}
      </form>
    </FormComponent>
  );
};

export default Form;

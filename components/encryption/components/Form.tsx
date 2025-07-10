'use client';

import { useMemo, type FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';

import {
  Form as FormComponent,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { savePasswordToLocalStorage } from '@/utils/cryptoHelper';

type Props = {
  updateIsShowEncryption: (value: boolean) => void;
};

const Form: FC<Props> = ({ updateIsShowEncryption }) => {
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
    const { password } = values;
    savePasswordToLocalStorage(password);
    updateIsShowEncryption(false);
  };

  return (
    <FormComponent {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full py-4">
        <div className="space-y-4">
          <div className="text-sm">{t('description')}</div>

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('password')}</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormDescription>{t('password_hint')}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">{t('get_access')}</Button>
      </form>
    </FormComponent>
  );
};

export default Form;

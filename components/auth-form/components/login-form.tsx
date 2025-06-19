'use client';

import { useEffect, useMemo, useState } from 'react';
import { signIn } from 'next-auth/react';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

import { PATHS } from '@/constants/paths';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import BaseForm from './base-form';

import type { OAuthErrorKeys } from '@/types/error-auth.types';
import { toast } from 'sonner';

type Props = {
  message: OAuthErrorKeys | null;
  isSuccessRegister?: boolean;
};

export function LoginForm({ message, isSuccessRegister = false }: Props) {
  const t = useTranslations('sign_in');
  const tErrors = useTranslations('errors');

  const [isLoadingCredentials, setIsLoadingCredentials] = useState(false);

  const loginSchema = useMemo(
    () =>
      z.object({
        email: z
          .string({
            required_error: tErrors('email.required'),
            invalid_type_error: tErrors('email.type'),
          })
          .email(tErrors('email.invalid'))
          .max(254, tErrors('email.max', { max: 254 })),

        password: z
          .string({
            required_error: tErrors('password.required'),
            invalid_type_error: tErrors('password.type'),
          })
          .min(8, tErrors('password.min', { min: 8 }))
          .max(100, tErrors('password.max', { max: 100 })),
      }),
    [tErrors]
  );

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsLoadingCredentials(true);
    await signIn('credentials', { email: values.email, password: values.password });
  };

  useEffect(() => {
    if (isSuccessRegister) {
      toast.success(t('registration.success'));
    }
  }, [isSuccessRegister, t]);

  return (
    <BaseForm>
      <Form {...form}>
        <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
          <div className="grid gap-6">
            {message && <div className="text-sm text-center text-red-500 ">{message}</div>}
            <div className="grid gap-6">
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('email')}</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="m@example.com" disabled={isLoadingCredentials} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('password')}</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="**********" disabled={isLoadingCredentials} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoadingCredentials}>
                {isLoadingCredentials && <Loader2 className="animate-spin" />}
                {t('login')}
              </Button>
            </div>
            <div className="text-center text-sm">
              {t('no_account')}{' '}
              <Link href={PATHS.auth.signUp} className="underline underline-offset-4">
                {t('register')}
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </BaseForm>
  );
}

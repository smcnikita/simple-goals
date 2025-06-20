'use client';

import { useMemo, useState } from 'react';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { PATHS } from '@/constants/paths';

import { zodResolver } from '@hookform/resolvers/zod';

import { httpRegister } from '@/lib/http/register';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import BaseForm from './base-form';

export function RegisterForm() {
  const t = useTranslations('sign_in');
  const tErrors = useTranslations('errors');

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const registerSchema = useMemo(
    () =>
      z
        .object({
          name: z
            .string({
              required_error: tErrors('username.required'),
              invalid_type_error: tErrors('username.type'),
            })
            .min(2, tErrors('username.min', { min: 2 }))
            .max(50, tErrors('username.max', { max: 50 }))
            .regex(/^[a-zA-Zа-яА-Я\s\-]+$/, tErrors('username.invalid')),

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
      email: '',
      name: '',
      password: '',
      passwordRepeat: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    setIsLoading(true);
    setErrorMessage('');

    await httpRegister({
      email: values.email,
      password: values.password,
      name: values.name,
    })
      .then(() => {
        router.push(PATHS.auth.signIn + '?success="true"');
      })
      .catch((er) => {
        setErrorMessage(er.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <BaseForm>
      <Form {...form}>
        <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
          <div className="grid gap-6">
            {errorMessage && <div className="text-sm text-center text-red-500 ">{errorMessage}</div>}
            <div className="grid gap-6">
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('email')}</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="m@example.com" disabled={isLoading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('name')}</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="John Doe" disabled={isLoading} {...field} />
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
                        <Input type="password" placeholder="**********" disabled={isLoading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="passwordRepeat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('passwordRepeat')}</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="**********" disabled={isLoading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="animate-spin" />}
                {t('register')}
              </Button>
            </div>
            <div className="text-center text-sm">
              {t('yes_account')}{' '}
              <Link href={PATHS.auth.signIn} className="underline underline-offset-4">
                {t('login')}
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </BaseForm>
  );
}

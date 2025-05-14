'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { cn } from '@/lib/utils';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import LangSwitcher from './LangSwitcher';

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const t = useTranslations('sign_in');
  const tErrors = useTranslations('errors');

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
    await signIn('credentials', { email: values.email, password: values.password });
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <div className="absolute top-4 right-4">
        <LangSwitcher />
      </div>

      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{t('h1')}</CardTitle>
          <CardDescription>{t('h2')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
              <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={async () => await signIn('yandex')}
                  >
                    <Image src="/img/yandex.png" alt="Yandex logo" width={16} height={16} />
                    {t('yandex')}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={async () => await signIn('github')}
                  >
                    <Image src="/img/github-mark.png" alt="GitHub logo" width={16} height={16} />
                    {t('github')}
                  </Button>
                </div>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">{t('or')}</span>
                </div>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('email')}</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="m@example.com" {...field} />
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
                            <Input type="password" placeholder="**********" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    {t('login')}
                  </Button>
                </div>
                {/* <div className="text-center text-sm">
                  Don&apos;t have an account?{' '}
                  <a href="#" className="underline underline-offset-4">
                    Sign up
                  </a>
                </div> */}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      {/* <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </div> */}
    </div>
  );
}

'use client';

import { Loader2 } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useMemo, useState, type FC } from 'react';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';

import { zodResolver } from '@hookform/resolvers/zod';

import { httpUpdateUserName } from '@/lib/http/update-user-name.http';

import { Button } from '@/components/ui/button';
import {
  Form as FormComponent,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type Props = {
  currentUserName: string;
};

const Form: FC<Props> = ({ currentUserName }) => {
  const t = useTranslations();
  const tLogin = useTranslations('sign_in');
  const tErrors = useTranslations('errors');
  const tSettings = useTranslations('user_settings');

  const { update } = useSession();

  const [oldUserName, setOldUserName] = useState(currentUserName);
  const [isLoading, setIsLoading] = useState(false);

  const registerSchema = useMemo(
    () =>
      z.object({
        name: z
          .string({
            required_error: tErrors('username.required'),
            invalid_type_error: tErrors('username.type'),
          })
          .min(2, tErrors('username.min', { min: 2 }))
          .max(50, tErrors('username.max', { max: 50 }))
          .regex(/^[a-zA-Zа-яА-Я\s\-]+$/, tErrors('username.invalid')),
      }),
    [tErrors]
  );

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: currentUserName,
    },
  });

  const name = form.watch('name');

  const isNameChanged = useMemo(() => {
    return name !== oldUserName;
  }, [oldUserName, name]);

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    await httpUpdateUserName(values.name)
      .then(async ({ data }) => {
        const newName = data.data.name;
        setOldUserName(newName);

        await update({ name: newName });
      })

      .catch(() => {
        toast.error(tErrors('user_update_name'));
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{tLogin('name')}</FormLabel>
              <FormControl>
                <Input className="max-w-[300px]" type="text" placeholder="John Doe" disabled={isLoading} {...field} />
              </FormControl>
              <FormDescription className="flex items-center gap-2">
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    {tSettings('is_updated')}
                  </>
                ) : (
                  <>{tSettings('enter_name')}</>
                )}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!isNameChanged || isLoading}>
          {t('save')}
        </Button>
      </form>
    </FormComponent>
  );
};

export default Form;

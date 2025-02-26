'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, type FC } from 'react';
import { useTranslations } from 'next-intl';
import { signIn } from 'next-auth/react';

import { PATHS } from '@/constants/paths';

import { useAuthHandlers } from '@/hooks/useAuthHandlers';

import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import Spinner from '@/components/ui/spinner';

import classes from '../page.module.css';

type ErrorsType = {
  email: null | string;
  password: null | string;
};

const defaultErrors: ErrorsType = {
  email: null,
  password: null,
};

const isShowForgotPassword = false;

const SignIn: FC = () => {
  const t = useTranslations('Auth');

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorsType>(defaultErrors);

  const githubClientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
  const yandexClientId = process.env.NEXT_PUBLIC_YANDEX_CLIENT_ID;

  const { handleYandexAuthClick } = useAuthHandlers({ githubClientId, yandexClientId });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    const result = await signIn('credentials', { email, password });

    if (result?.error) {
      alert(result.error);
      setErrors(defaultErrors);
      setIsLoading(false);
    } else {
      window.location.href = PATHS.home;
    }
  };

  return (
    <>
      <p className={classes.subtitle}>{t('description')}</p>

      <form onSubmit={onSubmit}>
        {/* Email */}
        <Input
          type="email"
          id="email"
          name="email"
          placeholder=" "
          required
          disabled={isLoading}
          message={errors.email ?? undefined}
        >
          {t('email')}
        </Input>
        {/* Password */}
        <Input
          type="password"
          id="password"
          name="password"
          placeholder=" "
          required
          disabled={isLoading}
          message={errors.password ?? undefined}
        >
          {t('password')}
        </Input>

        {/* Submit button */}
        <Button type="submit" variant="secondary" disabled={isLoading} style={{ height: 56 }}>
          {isLoading ? <Spinner /> : t('signIn')}
        </Button>

        <div className={classes.social}>
          <div className={classes.buttons}>
            {/* <Button size="sm" className={classes.button} disabled={isLoading}>
              <Image src="/images/google.png" width={20} height={20} alt="Sign in with Google" />
            </Button> */}
            <Button
              size="sm"
              className={classes.button}
              disabled={isLoading}
              onClick={async () => await signIn('github')}
            >
              <Image
                className={classes.githubIcon__dark}
                src="/images/github-white.png"
                width={20}
                height={20}
                alt={t('github')}
              />
              <Image
                className={classes.githubIcon__light}
                src="/images/github-mark.png"
                width={20}
                height={20}
                alt={t('github')}
              />
            </Button>
            <Button size="sm" className={classes.button} disabled={isLoading} onClick={handleYandexAuthClick}>
              <Image src="/images/yandex.png" width={20} height={20} alt={t('yandex')} />
            </Button>
          </div>
        </div>

        {isShowForgotPassword && (
          <Link href="/forgot-password" className={classes.link}>
            {t('forgotPassword')}
          </Link>
        )}
      </form>
    </>
  );
};

export default SignIn;

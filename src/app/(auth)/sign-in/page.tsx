'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useState, type FC } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslations } from 'next-intl';
import { randomBytes } from 'crypto';

import { PATHS } from '@/constants/paths';

import { httpSignIn } from '@/lib/http/auth';

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

  const handleGithubAuthClick = useCallback(() => {
    if (!githubClientId) {
      console.error('GitHub Client ID is missing');
      return;
    }

    const currentOrigin = window.location.origin;
    const csrfToken = randomBytes(16).toString('hex');

    const queryParams = new URLSearchParams({
      client_id: githubClientId,
      response_type: 'code',
      redirect_uri: `${currentOrigin}/integrations/github/oauth2/callback`,
      state: csrfToken,
      scope: 'read:user user:email',
    });

    const authUrl = `https://github.com/login/oauth/authorize?${queryParams.toString()}`;

    localStorage.setItem('latestCSRFToken', csrfToken);
    window.location.assign(authUrl);
  }, [githubClientId]);

  const handleYandexAuthClick = useCallback(() => {
    if (!yandexClientId) {
      console.error('Yandex Client ID is missing');
      return;
    }

    const currentOrigin = window.location.origin;
    const csrfToken = randomBytes(16).toString('hex');

    const queryParams = new URLSearchParams({
      client_id: yandexClientId,
      response_type: 'code',
      redirect_uri: `${currentOrigin}/integrations/yandex/oauth2/callback`,
      state: csrfToken,
    });

    const authUrl = `https://oauth.yandex.ru/authorize?${queryParams.toString()}`;

    localStorage.setItem('latestCSRFToken', csrfToken);
    window.location.assign(authUrl);
  }, [yandexClientId]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    const res = await httpSignIn(email, password);
    const dataRes = await res.json();

    if (!res.ok) {
      const { errors, message } = dataRes;

      if (errors && errors.email) {
        setErrors({ ...defaultErrors, email: errors.email[0] });
      }

      if (errors && errors.password) {
        setErrors({ ...defaultErrors, password: errors.password[0] });
      }

      if (message) {
        toast.error(message);
      }

      setIsLoading(false);

      return;
    }

    setErrors(defaultErrors);
    setIsLoading(false);

    window.location.href = PATHS.home;
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
            <Button size="sm" className={classes.button} disabled={isLoading} onClick={handleGithubAuthClick}>
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

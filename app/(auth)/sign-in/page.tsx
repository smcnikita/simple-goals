'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, type FC } from 'react';
import { toast } from 'react-hot-toast';

import { PATHS } from '@/constants/paths';

import { httpSignIn } from '@/lib/http/auth';

import Input from '@/components/ui/input';
import Button from '@/components/ui/button';

import classes from '../page.module.css';

type ErrorsType = {
  email: null | string;
  password: null | string;
};

const defaultErrors: ErrorsType = {
  email: null,
  password: null,
};

const SignIn: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorsType>(defaultErrors);
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
    }

    setErrors(defaultErrors);
    setIsLoading(false);

    window.location.href = PATHS.home;
  };

  return (
    <>
      <p className={classes.subtitle}>Sign in → Continue → Achieve</p>

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
          Email
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
          Password
        </Input>

        {/* Submit button */}
        <Button type="submit" variant="secondary" disabled={isLoading}>
          Sign In
        </Button>

        <div className={classes.social}>
          <div className={classes.buttons}>
            <Button size="sm" className={classes.button} disabled={isLoading}>
              <Image src="/images/google.png" width={20} height={20} alt="Sign in with Google" />
            </Button>
            <Button size="sm" className={classes.button} disabled={isLoading}>
              <Image src="/images/github-white.png" width={20} height={20} alt="Sign in with Github" />
            </Button>
          </div>
        </div>

        <Link href="/forgot-password" className={classes.link}>
          Forgot your password?
        </Link>
      </form>
    </>
  );
};

export default SignIn;

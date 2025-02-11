import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';

import Input from '@/components/ui/input';
import Button from '@/components/ui/button';

import classes from '../page.module.css';

const SignIn: FC = () => {
  return (
    <>
      <p className={classes.subtitle}>Sign in → Continue → Achieve</p>

      <form>
        {/* Email */}
        <Input type="email" id="email" name="email" placeholder=" ">
          Email
        </Input>
        {/* Password */}
        <Input type="password" id="password" name="password" placeholder=" ">
          Password
        </Input>

        {/* Submit button */}
        <Button type="submit" variant="secondary">
          Sign In
        </Button>

        <div className={classes.social}>
          <div className={classes.buttons}>
            <Button size="sm" className={classes.button}>
              <Image src="/images/google.png" width={20} height={20} alt="Sign in with Google" />
            </Button>
            <Button size="sm" className={classes.button}>
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

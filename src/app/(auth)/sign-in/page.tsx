import { getTranslations } from 'next-intl/server';

import messages from '@root/messages/en.json';

import { LoginForm } from '@/components/auth';

import type { OAuthErrorKeys } from '@/types/auth/error';

interface Props {
  error: string | string[] | undefined;
  success: string | undefined;
}

const OAUTH_ERRORS = Object.keys(messages.errors.OAuth) as OAuthErrorKeys[];

function isOAuthError(error: string): error is OAuthErrorKeys {
  return OAUTH_ERRORS.includes(error as OAuthErrorKeys);
}

async function SignIn({ searchParams }: { searchParams: Promise<Props> }) {
  const { error, success } = await searchParams;
  const t = await getTranslations('errors.OAuth');

  const rawError: string | undefined = Array.isArray(error) ? error[0] : error;
  const errorKey: OAuthErrorKeys | null = rawError && isOAuthError(rawError) ? rawError : null;
  const errorMessage: OAuthErrorKeys | null = errorKey ? (t(errorKey) as OAuthErrorKeys) : null;

  return <LoginForm message={errorMessage} isSuccessRegister={success ? true : false} />;
}

export default SignIn;

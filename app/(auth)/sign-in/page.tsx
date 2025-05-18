import { getTranslations } from 'next-intl/server';

import { LoginForm } from '@/components/login-form';

import messages from '@/messages/en.json';

import type { OAuthErrorKeys } from '@/types/error-auth.types';

interface Props {
  error: string | string[] | undefined;
}

const OAUTH_ERRORS = Object.keys(messages.errors.OAuth) as OAuthErrorKeys[];

function isOAuthError(error: string): error is OAuthErrorKeys {
  return OAUTH_ERRORS.includes(error as OAuthErrorKeys);
}

async function SignIn({ searchParams }: { searchParams: Promise<Props> }) {
  const { error } = await searchParams;
  const t = await getTranslations('errors.OAuth');

  const rawError: string | undefined = Array.isArray(error) ? error[0] : error;
  const errorKey: OAuthErrorKeys | null = rawError && isOAuthError(rawError) ? rawError : null;
  const errorMessage: OAuthErrorKeys | null = errorKey ? (t(errorKey) as OAuthErrorKeys) : null;

  return <LoginForm message={errorMessage} />;
}

export default SignIn;

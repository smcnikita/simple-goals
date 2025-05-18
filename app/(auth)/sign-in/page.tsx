import { getTranslations } from 'next-intl/server';

import { LoginForm } from '@/components/login-form';

import messages from '@/messages/en.json';

interface Props {
  error: string | string[] | undefined;
}

type OAuthErrorKeys = keyof typeof messages.errors.OAuth;

const OAUTH_ERRORS = Object.keys(messages.errors.OAuth) as OAuthErrorKeys[];

function isOAuthError(error: string): error is OAuthErrorKeys {
  return OAUTH_ERRORS.includes(error as OAuthErrorKeys);
}

async function SignIn({ searchParams }: { searchParams: Promise<Props> }) {
  const { error } = await searchParams;
  const t = await getTranslations('errors.OAuth');

  const rawError = Array.isArray(error) ? error[0] : error;
  const errorKey = rawError && isOAuthError(rawError) ? rawError : 'default';

  return <LoginForm message={t(errorKey)} />;
}

export default SignIn;

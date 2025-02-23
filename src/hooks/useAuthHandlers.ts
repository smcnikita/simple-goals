import { useCallback } from 'react';
import { randomBytes } from 'crypto';
import { PATHS } from '@/constants/paths';

interface AuthParams {
  clientId: string;
  authUrl: string;
  redirectPath: string;
  scope?: string;
}

interface AuthHandlers {
  githubClientId?: string;
  yandexClientId?: string;
}

const handleAuthClick = ({ clientId, authUrl, redirectPath, scope }: AuthParams) => {
  if (!clientId) {
    console.error('Client ID is missing');
    return;
  }

  const currentOrigin = window.location.origin;
  const csrfToken = randomBytes(16).toString('hex');

  const queryParams = new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: `${currentOrigin}${redirectPath}`,
    state: csrfToken,
    ...(scope && { scope }),
  });

  const fullAuthUrl = `${authUrl}?${queryParams.toString()}`;

  localStorage.setItem('latestCSRFToken', csrfToken);
  window.location.assign(fullAuthUrl);
};

export const useAuthHandlers = ({ githubClientId, yandexClientId }: AuthHandlers) => {
  const handleGithubAuthClick = useCallback(() => {
    handleAuthClick({
      clientId: githubClientId as string,
      authUrl: 'https://github.com/login/oauth/authorize',
      redirectPath: PATHS.auth.oauth.github,
      scope: 'read:user user:email',
    });
  }, [githubClientId]);

  const handleYandexAuthClick = useCallback(() => {
    handleAuthClick({
      clientId: yandexClientId as string,
      authUrl: 'https://oauth.yandex.ru/authorize',
      redirectPath: PATHS.auth.oauth.yandex,
    });
  }, [yandexClientId]);

  return { handleGithubAuthClick, handleYandexAuthClick };
};

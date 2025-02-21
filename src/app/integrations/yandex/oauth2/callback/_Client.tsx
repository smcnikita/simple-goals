'use client';

import { PATHS } from '@/constants/paths';
import { useCallback, useEffect, type FC } from 'react';

type Props = {
  code: string;
  state: string;
};

const YandexClient: FC<Props> = ({ code, state }) => {
  const handleOauthToken = useCallback(async () => {
    try {
      const res = await fetch('/api/oauth-token/yandex', {
        method: 'POST',
        body: JSON.stringify({ code }),
      });

      const data = await res.json();

      if (data.token) {
        window.location.href = PATHS.home;
      } else {
        window.location.href = PATHS.auth.signIn;
      }
    } catch (error) {
      window.location.href = PATHS.auth.signIn;
    }
  }, [code]);

  useEffect(() => {
    if (state === localStorage.getItem('latestCSRFToken')) {
      localStorage.removeItem('latestCSRFToken');
      handleOauthToken();
    }
  }, [handleOauthToken, state]);

  return <></>;
};

export default YandexClient;

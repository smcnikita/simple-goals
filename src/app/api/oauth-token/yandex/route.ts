import { NextRequest, NextResponse } from 'next/server';

import { userController } from '@/controllers/user-controller';
import { fetchOrCreateUser } from '@/services/user-service';
import { createTokenAndAuth } from '@/services/auth-service';

const YANDEX_TOKEN_URL = 'https://oauth.yandex.ru/token';
const YANDEX_USER_INFO_URL = 'https://login.yandex.ru/info';
const ERROR_RESPONSE = { message: 'error' };
const STATUS_ERROR = 500;

async function fetchYandexToken(code: string, clientId: string, clientSecret: string) {
  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
  });

  const response = await fetch(YANDEX_TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  });

  return response.json();
}

async function fetchYandexUserInfo(accessToken: string) {
  const response = await fetch(YANDEX_USER_INFO_URL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.json();
}

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();

    const clientId = process.env.NEXT_PUBLIC_YANDEX_CLIENT_ID;
    const clientSecret = process.env.YANDEX_CLIENT_SECRET;

    if (!code || !clientId || !clientSecret) {
      return NextResponse.json(ERROR_RESPONSE, { status: STATUS_ERROR });
    }

    const tokenData = await fetchYandexToken(code, clientId, clientSecret);

    if (tokenData.error) {
      return NextResponse.json(ERROR_RESPONSE, { status: STATUS_ERROR });
    }

    const userInfo = await fetchYandexUserInfo(tokenData.access_token);

    if (userInfo.error) {
      return NextResponse.json(ERROR_RESPONSE, { status: STATUS_ERROR });
    }

    const { real_name: name, default_email: email } = userInfo;

    const user = await userController.getUserByEmail(email);

    const { id: userId, name: userName } = await fetchOrCreateUser({
      user,
      options: {
        email,
        name,
        password: 'no-password-yandex',
      },
    });

    return await createTokenAndAuth(userId, userName);
  } catch (error) {
    console.error('Error in POST handler:', error);
    return NextResponse.json(ERROR_RESPONSE, { status: STATUS_ERROR });
  }
}

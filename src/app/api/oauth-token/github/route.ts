import { NextRequest, NextResponse } from 'next/server';

import { userController } from '@/controllers/user-controller';
import { createTokenAndAuth } from '@/services/auth-service';
import { fetchOrCreateUser } from '@/services/user-service';

const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token';
const GITHUB_USER_URL = 'https://api.github.com/user';
const GITHUB_USER_EMAILS_URL = 'https://api.github.com/user/emails';
const ERROR_RESPONSE = { message: 'error' };
const STATUS_ERROR = 500;

type Email = {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string;
};

async function fetchGitHubToken(code: string, clientId: string, clientSecret: string) {
  const queryParams = new URLSearchParams({
    code,
    client_id: clientId,
    client_secret: clientSecret,
  });

  const response = await fetch(`${GITHUB_TOKEN_URL}?${queryParams}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  return response.json();
}

async function fetchGitHubUserInfo(accessToken: string) {
  const response = await fetch(GITHUB_USER_URL, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.json();
}

async function fetchGitHubUserEmails(accessToken: string) {
  const response = await fetch(GITHUB_USER_EMAILS_URL, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.json();
}

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();

    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;

    if (!code || !clientId || !clientSecret) {
      return NextResponse.json(ERROR_RESPONSE, { status: STATUS_ERROR });
    }

    const tokenData = await fetchGitHubToken(code, clientId, clientSecret);

    if (tokenData.error) {
      return NextResponse.json(ERROR_RESPONSE, { status: STATUS_ERROR });
    }

    const userInfo = await fetchGitHubUserInfo(tokenData.access_token);

    if (userInfo.error) {
      return NextResponse.json(ERROR_RESPONSE, { status: STATUS_ERROR });
    }

    const userEmails = await fetchGitHubUserEmails(tokenData.access_token);

    if (userEmails.error) {
      return NextResponse.json(ERROR_RESPONSE, { status: STATUS_ERROR });
    }

    const primaryEmail = userEmails.find((email: Email) => email.primary)?.email;

    if (!primaryEmail) {
      return NextResponse.json(ERROR_RESPONSE, { status: STATUS_ERROR });
    }

    const { name } = userInfo;

    const user = await userController.getUserByEmail(primaryEmail);

    const { id: userId, name: userName } = await fetchOrCreateUser({
      user,
      options: {
        email: primaryEmail,
        name,
        password: 'no-password-github',
      },
    });

    return await createTokenAndAuth(userId, userName);
  } catch (error) {
    console.error('Error in POST handler:', error);
    return NextResponse.json(ERROR_RESPONSE, { status: STATUS_ERROR });
  }
}

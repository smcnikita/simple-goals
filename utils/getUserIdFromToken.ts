import { decrypt } from '@/lib/session';

type RequestCookie = {
  name: string;
  value: string;
};

export const getUserIdFromToken = async (token: RequestCookie | undefined): Promise<number | null> => {
  if (!token) {
    return null;
  }

  const data = await decrypt(token.value);

  if (!data || !data.sub) {
    return null;
  }

  const sub = JSON.parse(data.sub);

  return Number(sub.userId);
};

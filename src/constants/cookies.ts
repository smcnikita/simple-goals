export const TOKEN = 'token';

export const cookieOptions = {
  name: TOKEN,
  httpOnly: true,
  path: '/',
  secure: process.env.NODE_ENV !== 'development' && process.env.USE_HTTPS === 'true',
  maxAge: 60 * 60 * 24 * 3, // 3 days
};

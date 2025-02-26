import { withAuth } from 'next-auth/middleware';
import { PATHS } from './constants/paths';

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      // Если токен существует, пользователь авторизован
      return !!token;
    },
  },
  pages: {
    signIn: PATHS.auth.signIn,
  },
});
// Конфигурация middleware
export const config = {
  matcher: ['/goals/:path*'],
};

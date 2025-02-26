import { withAuth } from 'next-auth/middleware';
import { PATHS } from './constants/paths';

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
  pages: {
    signIn: PATHS.auth.signIn,
  },
});

export const config = {
  matcher: ['/goals/:path*'],
};

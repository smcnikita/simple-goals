import type { NextRequest } from 'next/server';

import { middlewareController } from './controllers/middleware-controllers';

export function middleware(request: NextRequest) {
  const response = middlewareController.setCors(request);

  return middlewareController.setAuth(request, response);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};

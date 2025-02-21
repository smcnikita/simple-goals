import type { NextRequest } from 'next/server';

import { middlewareController } from './controllers/middleware-controller';

export function middleware(request: NextRequest) {
  const response = middlewareController.setCors(request);

  return middlewareController.setAuth(request, response);
}

export const config = {
  matcher: [
    '/(en|ru)/:path*',
    '/((?!api|_next/static|_next/image|images|favicon.ico|sitemap.xml|robots.txt|manifest.json|apple-icon.png|icon.png|icon.svg|tableau.json|tableau.png).*)',
  ],
};

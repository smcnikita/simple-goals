import type { NextRequest } from 'next/server';

import { middlewareController } from './controllers/middleware-controller';

export async function middleware(request: NextRequest) {
  const response = middlewareController.setCors(request);

  return await middlewareController.setAuth(request, response);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|favicon.ico|sitemap.xml|robots.txt|manifest.json|apple-icon.png|icon.png|icon.svg|web-app-manifest-192x192.png|web-app-manifest-512x512.png| tableau.json|tableau.png).*)',
  ],
};

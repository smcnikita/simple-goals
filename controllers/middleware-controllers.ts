'use server';

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { corsService } from '@/services/cors-service';
import { authService } from '@/services/auth-service';

export const middlewareController = {
  setCors: (request: NextRequest) => {
    return corsService(request);
  },

  setAuth: (request: NextRequest, response: NextResponse) => {
    return authService(request, response);
  },
};

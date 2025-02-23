'use server';

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { corsService } from '@/services/cors-service';
import { authService } from '@/services/auth-service';

export const middlewareController = {
  setCors: (request: NextRequest): NextResponse => {
    return corsService(request);
  },

  setAuth: async (request: NextRequest, response: NextResponse): Promise<NextResponse> => {
    return await authService(request, response);
  },
};

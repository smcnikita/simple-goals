import type { NextRequest, NextResponse } from 'next/server';

import { middlewareController } from '../../middleware-controller';

import { corsService } from '@/services/cors-service';
import { authService } from '@/services/auth-service';

jest.mock('@/services/cors-service', () => ({
  corsService: jest.fn(),
}));

jest.mock('@/services/auth-service', () => ({
  authService: jest.fn(),
}));

describe('middlewareController', () => {
  let mockRequest: NextRequest;
  let mockResponse: NextResponse;

  beforeEach(() => {
    mockRequest = {} as NextRequest;
    mockResponse = {} as NextResponse;

    jest.clearAllMocks();
  });

  describe('setCors', () => {
    it('should call corsService with the request', () => {
      middlewareController.setCors(mockRequest);

      expect(corsService).toHaveBeenCalledWith(mockRequest);
      expect(corsService).toHaveBeenCalledTimes(1);
    });
  });

  describe('setAuth', () => {
    it('should call authService with the request and response', () => {
      middlewareController.setAuth(mockRequest, mockResponse);

      expect(authService).toHaveBeenCalledWith(mockRequest, mockResponse);
      expect(authService).toHaveBeenCalledTimes(1);
    });
  });
});

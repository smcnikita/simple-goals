import { NextResponse } from 'next/server';

export function createErrorResponse(message: string, status = 400): NextResponse<{ message: string }> {
  return NextResponse.json({ message }, { status });
}

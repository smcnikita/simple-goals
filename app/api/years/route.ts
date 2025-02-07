import { NextResponse } from 'next/server';

import { yearsController } from '@/controllers/years-controller';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userIdStr = searchParams.get('userId');

  if (!userIdStr) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 });
  }

  const userId = Number(userIdStr);
  if (isNaN(userId)) {
    return NextResponse.json({ error: 'Invalid userId' }, { status: 400 });
  }

  try {
    const years = await yearsController.getUserYearsFormatted(userId);
    return NextResponse.json(years);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

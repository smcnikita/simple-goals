import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';
import { yearsController } from '@/controllers/years-controller';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userId = Number(session.user.id);

  const res = await req.json();

  const { year } = res as {
    year: number;
  };

  if (!year) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }

  const yearModel = await yearsController.getYearByName({ userId, year });

  if (!yearModel) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }

  const updatedYear = await yearsController.updateCanEditPast({
    id: yearModel.id,
    isCurrentCanEditPast: yearModel.can_edit_past,
    userId,
  });

  if (!updatedYear) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }

  const response = NextResponse.json(
    {
      message: 'Success',
      data: {
        year: updatedYear,
      },
    },
    { status: 200 }
  );

  return response;
}

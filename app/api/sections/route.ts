import { sectionsController } from '@/controllers/sections/sections.controller';
import { createErrorResponse } from '@/lib/createErrorResponse';
import { createSuccessResponse } from '@/lib/createSuccessResponse';
import { getUserAndYearModel } from '@/lib/getUserAndYearModel';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const year = Number(searchParams.get('year'));

  const result = await getUserAndYearModel(year);

  if (result instanceof Response) {
    return result;
  }

  const [userId, yearModel] = result;

  const sections = await sectionsController.getSections(userId, yearModel.id);

  return createSuccessResponse({
    sections,
  });
}

type Payload = {
  year: number;
  name: string;
};

export async function POST(req: NextRequest) {
  const { year, name } = (await req.json()) as Payload;

  if (!name || !year) {
    return createErrorResponse('Missing required fields', 422);
  }

  const result = await getUserAndYearModel(year);

  if (result instanceof Response) {
    return result;
  }

  const [userId, yearModel] = result;

  try {
    const newSection = await sectionsController.createSection({
      userId,
      yearId: yearModel.id,
      name,
    });

    return createSuccessResponse({ section: newSection });
  } catch (error) {
    return createErrorResponse((error as Error).message, 500);
  }
}

type DeletePayload = {
  year: number;
  sectionId: number;
};

export async function DELETE(req: NextRequest) {
  const { year, sectionId } = (await req.json()) as DeletePayload;

  if (!sectionId || !year) {
    return createErrorResponse('Missing required fields', 422);
  }

  const result = await getUserAndYearModel(year);

  if (result instanceof Response) {
    return result;
  }

  const [userId, yearModel] = result;

  try {
    await sectionsController.deleteSection({
      userId,
      yearId: yearModel.id,
      sectionId,
    });

    return createSuccessResponse({ sectionId: sectionId });
  } catch (error) {
    return createErrorResponse((error as Error).message, 500);
  }
}

type UpdatePayload = {
  year: number;
  sectionId: number;
  name: string;
};

export async function PUT(req: NextRequest) {
  const { year, sectionId, name } = (await req.json()) as UpdatePayload;

  if (!name || !year || !sectionId) {
    return createErrorResponse('Missing required fields', 422);
  }

  const result = await getUserAndYearModel(year);

  if (result instanceof Response) {
    return result;
  }

  const [userId, yearModel] = result;

  try {
    const updatedSection = await sectionsController.updateSection({
      userId,
      yearId: yearModel.id,
      sectionId,
      name,
    });

    return createSuccessResponse({ section: updatedSection });
  } catch (error) {
    return createErrorResponse((error as Error).message, 500);
  }
}

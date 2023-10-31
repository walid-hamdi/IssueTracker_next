import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createIssusSchema } from "../../validationSchema";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const issue = createIssusSchema.safeParse(body);
  if (!issue.success)
    return NextResponse.json(issue.error.format(), { status: 400 });

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json({ newIssue }, { status: 201 });
}

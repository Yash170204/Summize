import { PrismaClient } from "@prisma/client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  if (!user || !user.id) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const fileUrl = searchParams.get("fileUrl");

  if (!fileUrl) {
    return new Response(JSON.stringify({ error: "Missing fileUrl" }), { status: 400 });
  }

  const summary = await prisma.pdfSummary.findFirst({
    where: {
      fileUrl,
      userId: user.id,
    },
  });

  if (!summary) {
    return new Response(JSON.stringify({ status: "not_found" }), { status: 404 });
  }

  return new Response(
    JSON.stringify({
      status: summary.summary ? "done" : "pending",
      summary: summary.summary || null,
    }),
    { status: 200 }
  );
}

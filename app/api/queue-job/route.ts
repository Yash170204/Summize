import { Queue } from "bullmq";
import { redis } from "@/lib/redis";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const body = await req.json();
  const { fileUrl } = body;
  if (!fileUrl) {
    return new Response(JSON.stringify({ error: "Missing fileUrl" }), {
      status: 400,
    });
  }

  const queue = new Queue("pdf-summarization", { connection: redis });

  await queue.add("summarize", {
    fileUrl,
    userId: session.user.id,
  });

  return new Response(JSON.stringify({ status: "queued" }), {
    status: 200,
  });
}

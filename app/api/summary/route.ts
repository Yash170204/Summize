import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })
        if(!session?.user) {
            return NextResponse.json({
                error: "Unauthorized"
            }, { status: 401})
        }

        const userId = session.user.id;
        const summaries = await prisma.pdfSummary.findMany({
            where: {
                userId
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return NextResponse.json({
            summaries
        }, { status: 200 })
    } catch (error) {
        console.error("Error fetching summaries:", error);
        return NextResponse.json({
            error: error
        }, { status: 500})
    }
}
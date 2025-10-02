"use server";

import { prisma } from "@/lib/auth";

export async function verifyCodeQR(code: string) {
    const participant = await prisma.participant.findFirst({
        select: {
            id: true,
        },
        where: {
            code,
        }
    })

    if (!participant) {
        return false;
    }

    return participant.id;
}
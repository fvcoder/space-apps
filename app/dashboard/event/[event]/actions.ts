"use server";

import { prisma } from "@/lib/auth";

export type AllowFeatures = "extra" | "launch1" | "dinner" | "breakfast" | "launch2"

const allowFeatures = [
    "extra",
    "launch1",
    "dinner",
    "breakfast",
    "launch2"
]

export async function registerParticipantEvent(code: string, feature: AllowFeatures, userId: string) {
    if (!allowFeatures.includes(feature)) {
        return "Evento invalido";
    }

    const participant = await prisma.p.findFirst({
        select: {
            id: true,
        },
        where: {
            code,
        }
    })

    if (!participant) {
        return "Participante no encontrado"
    }

    const item = await prisma.pItem.findFirst({
        select: {
            id: true,
            deliveredDate: true,  
        },
        where: {
            pId: participant.id,
            type: feature
        }
    })

    if (!item) {
        return "No corresponde";
    }

    if (item.deliveredDate) {
        return "Ya fue entregado"
    }

    await prisma.pItem.update({
        data: {
            deliveredDate: new Date,
            deliveredUserId: userId,
        },
        where: {
            id: item.id
        }
    })

    return "Registrado correctamente";
}
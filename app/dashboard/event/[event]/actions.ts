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

    const participant = await prisma.participant.findFirst({
        select: {
            id: true,
            [feature]: true,
            package: true,
        },
        where: {
            code
        }
    })

    if (!participant) {
        return "Participante no encontrado"
    }

    if (Object.keys(participant[feature]).length !== 0) {
        return "Ya fue entregado"
    }

    const data: Record<string, any> = {}
    data[feature] = { userId: userId, date: new Date().toISOString() }

    await prisma.participant.update({
        select: {
            id: true
        },
        data,
        where: {
            id: participant.id
        }
    })

    if (feature === "extra") {
        return {
           message: "Registrado correctamente",
           package: participant.package
        }
    }

    return "Registrado correctamente";
}
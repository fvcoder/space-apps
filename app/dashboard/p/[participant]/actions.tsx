"use server";

import { prisma } from "@/lib/auth";

export interface assignFeatureProps {
    participantId: string
    feature: string
    userId: string
}

export async function assignFeature(props: assignFeatureProps) {
    const participant = await prisma.participant.findFirst({
        where: {
            id: props.participantId
        }
    })


    if (!participant) {
        return false;
    }

    const data: Record<string, any> = {}
    data[props.feature] = { userId: props.userId, date: new Date().toISOString() }

    console.log(data)

    const res = await prisma.participant.update({
        select: {
            id: true
        },
        data,
        where: {
            id: props.participantId
        }
    })

    return res.id;
}

export async function assignCodeQR(participantId: string, code: string) {
    const participantWithCode = await prisma.participant.findFirst({
        where: {
            code
        }
    })
    if (participantWithCode) {
        return "Código ya asignado a otro participante";
    }
    const participant = await prisma.participant.findFirst({
        where: {
            id: participantId
        }
    })
    if (!participant) {
        return "Participante no encontrado";
    }
    if (participant.code) {
        return "El participante ya tiene un código asignado";
    }

    await prisma.participant.update({
        data: {
            code
        },
        where: {
            id: participantId
        }
    })
    
    return true;
}
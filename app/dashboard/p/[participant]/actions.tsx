"use server";

import { prisma } from "@/lib/auth";

export interface assignFeatureProps {
    pItemId: string
    userId: string
}

export async function assignFeature(props: assignFeatureProps) {
    const item = await prisma.pItem.findFirst({
        where: {
            id: props.pItemId
        }
    })


    if (!item) {
        return false;
    }

    const res = await prisma.pItem.update({
        select: {
            id: true
        },
        data: {
            deliveredUserId: props.userId,
            deliveredDate: new Date
        },
        where: {
            id: item.id
        }
    })

    return res.id;
}

export async function assignCodeQR(participantId: string, code: string) {
    const participantWithCode = await prisma.p.findFirst({
        where: {
            code
        }
    })
    if (participantWithCode) {
        return "Código ya asignado a otro participante";
    }
    const participant = await prisma.p.findFirst({
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

    await prisma.p.update({
        data: {
            code,
            codeDate: new Date()
        },
        where: {
            id: participantId
        }
    })
    
    return true;
}
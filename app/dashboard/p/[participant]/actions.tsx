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
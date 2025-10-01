import { prisma } from "@/lib/auth";
import { ParticipantData, ParticipantMain } from "./main";
import { notFound } from "next/navigation";

export default async function ParticipantsDetail({ params }: any) {
    const { participant } = await params;

    const dta = await prisma.participant.findFirst({
        where: {
            id: participant
        }
    })

    if (!dta) {
        return notFound();
    }

    return <ParticipantMain data={{ ...dta, createAt: dta?.createAt.toISOString(), updateAt: dta.updateAt.toISOString() } as ParticipantData} />
}
import { prisma } from "@/lib/auth";
import { ParticipantData, ParticipantMain } from "./main";
import { notFound } from "next/navigation";

export default async function ParticipantsDetail({ params }: any) {
    const { participant } = await params;

    const dta = await prisma.p.findFirst({
        select: {
            id: true,
            code: true,
            name: true,
            items: true,
            type: true,
            package: true,
        },
        where: {
            id: participant
        }
    })

    if (!dta) {
        return notFound();
    }

    const { items, ...participantData } = dta;

    return <ParticipantMain participant={participantData} items={items}/>
}
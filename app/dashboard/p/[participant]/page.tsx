import { prisma } from "@/lib/auth";
import { ParticipantData, ParticipantMain } from "./main";
import { notFound } from "next/navigation";
import { randomUUID } from "node:crypto";

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

    const del = items.filter((x) => x.type === "launch2")

    /*
    const d = await Promise.all(["launch1", "dinner", "breakfast", "launch2"].map(async (x) => {
        return await prisma.pItem.create({
            data: {
                type: x,
                id: randomUUID(),
                pId: participant
            }
        })
    }))
    console.log(d);
    */

    /*
    const data = [
        {
        "id": "7ca55fb0-5a77-46b1-b3ff-759830b73e16",
        "type": "extra",
        "name": "botón"
      },
      {
        "id": "22d89a92-ef98-4180-9f86-33b82b4e6b3c",
        "type": "extra",
        "name": "vaso"
      },
      {
        "id": "8fa19d5f-30ac-4a93-a737-c89ea30af245",
        "type": "extra",
        "name": "stickers"
      },
      {
        "id": "f97d64f4-4d00-4716-a91f-168053280efd",
        "type": "extra",
        "name": "llaveros"
      }
    ]
    const d = await prisma.pItem.createMany({
        data: data.map((x) => ({
            ...x,
            id: randomUUID(),
            pId: participant
        }))
    })

    console.log(d)
    */

    // console.log(await prisma.pItem.delete({ where: { id: del[0].id }}))

    /*
    await prisma.p.update({
        data: {
            code: null,
            codeDate: null
        },
        where: {
            id: participant,
        }
    })
        */


    return <ParticipantMain participant={participantData} items={items} />
}
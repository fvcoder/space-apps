'use server';

import { prisma } from "@/lib/auth";
import { Schema } from "./schema";
import { randomUUID } from "node:crypto";


export async function registerParticipant(data: Schema) {
    try {
        const id = randomUUID()
        const items = [];

        if (!data.package.startsWith('sin')) {
            if (data.type === "participante") {
                items.push({
                    type: "extra",
                    name: "botón",
                })
                items.push({
                    type: "extra",
                    name: "vaso",
                })
                items.push({
                    type: "extra",
                    name: "stickers",
                })
                items.push({
                    type: "extra",
                    name: "llaveros",
                })

                if (data.package.startsWith('f')) {
                    items.push({
                        type: "extra",
                        name: "polera",
                    })
                }
            }

            ["launch1","dinner","breakfast","launch2"].forEach((c) => {
                items.push({
                    type: c
                })
            })
        }

        await prisma.p.create({
            data: {
                id,
                name: data.name,
                type: data.type,
                ci: "",
                package: data.package,
            }
        })

        await prisma.pItem.createMany({
            data: items.map((i) => ({
                id: randomUUID() as string,
                pId: id,
                ...i
            }))
        })

        return id;
    } catch {
        return false;
    }
}
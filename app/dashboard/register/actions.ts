'use server';

import { prisma } from "@/lib/auth";
import { Schema } from "./schema";
import { randomUUID } from "node:crypto";


export async function registerParticipant(data: Schema) {
    try {
        const id = randomUUID()
        await prisma.participant.create({
            data: {
                id,
                name: data.name,
                type: data.type,
                package: data.package,
            }
        })

        return id;
    } catch {
        return false;
    }
}
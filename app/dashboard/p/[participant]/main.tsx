"use client";

export interface ParticipantData {
    id: string
    code?: string
    name: string
    image?: string
    type: string
    package: string
    dinner: Record<string, any>
    breakfast: Record<string, any>
    launch1: Record<string, any>
    launch2: Record<string, any>
    extra: Record<string, any>
    createAt: string
    updateAt: string
}

export function ParticipantMain({ data }: { data: ParticipantData }) {
    return <div>{JSON.stringify(data)}</div>;
}
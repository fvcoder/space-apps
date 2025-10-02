"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { textVariants } from "@/style/text";
import { IconCheck } from "@tabler/icons-react"
import { assignFeature } from "./actions";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useState } from "react";

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

interface featureItemProps {
    feature: string
    title: string,
    date?: string
}

function FeatureItem({ title, date, feature }: featureItemProps) {
    const [dateAssigned, setDateAssigned] = useState(date);
    const session = useSession();
    const params = useParams();

    function handleAssignFeature() {
        toast.promise(assignFeature({
            participantId: params.participant as string,
            feature,
            userId: session.data?.user.id as string
        }), {
            loading: "Asignando...",
            success: (data) => {
                if (typeof data === "string") {
                    setDateAssigned(new Date().toISOString());

                    return "Asignado correctamente"
                }

                return "Hubo un error inesperado :("
            },
            error: "Error al asignar"
        })
        
    }

    return (
        <Card>
            <CardContent className="flex items-center justify-between">
                <div className="flex-1">
                    <h3 className={textVariants({})}>{title}</h3>
                    {dateAssigned && <p className="text-sm text-muted-foreground">Entregado el {new Date(dateAssigned).toLocaleDateString("es-BO", { hour: "2-digit", minute: "2-digit"})}</p>}
                </div>
                <div>
                    <button className={cn("border-2 rounded size-6 transition-all flex items-center justify-center", {
                        "hover:bg-dark/20 dark:hover:bg-white/20": !date,
                        "bg-green-500": date
                    })} onClick={() => !date && handleAssignFeature()} disabled={!!date}>
                        {date && <IconCheck width={18} className="text-black" />}
                    </button>
                </div>
            </CardContent>
        </Card>
    )
}

export function ParticipantMain({ data }: { data: ParticipantData }) {

    return (
        <div className="max-w-3xl mx-auto px-6 py-4 w-full space-y-4">
            <section>
                <div>
                    <h1 className={textVariants({ size: "h3" })}>{data.name}</h1>
                    <p className="capitalize mt-2">{data.type} - {data.package}</p>
                </div>
            </section>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FeatureItem title="Accesorios" feature="extra" date={data.extra.date ?? undefined} />
                <FeatureItem title="Almuerzo dia 1" feature="launch1" date={data.launch1.date ?? undefined} />
                <FeatureItem title="Cena" feature="dinner" date={data.dinner.date ?? undefined} />
                <FeatureItem title="Desayuno" feature="breakfast" date={data.breakfast.date ?? undefined} />
                <FeatureItem title="Almuerzo dia 2" feature="launch2" date={data.launch2.date ?? undefined} />
            </section>
        </div>
    );
}
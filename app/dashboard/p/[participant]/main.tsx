"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { textVariants } from "@/style/text";
import { IconCheck } from "@tabler/icons-react"
import { assignCodeQR, assignFeature } from "./actions";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

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
                        "hover:bg-dark/20 dark:hover:bg-white/20": !dateAssigned,
                        "bg-green-500": dateAssigned
                    })} onClick={() => !dateAssigned && handleAssignFeature()} disabled={!!dateAssigned}>
                        {dateAssigned && <IconCheck width={18} className="text-black" />}
                    </button>
                </div>
            </CardContent>
        </Card>
    )
}

export function ParticipantMain(props: { data: ParticipantData }) {
    const [data, setData] = useState(props.data);
    const [code, setCode] = useState("")
    const [state, setState] = useState<"idle" | "verifying" | "success" | "error">("idle");
    const params = useParams();

    if (!data.code) {
        return (
            <div className="max-w-3xl mx-auto px-6 py-4 w-full flex-1 flex flex-col gap-4">
                <section>
                    <div className="text-center">
                        <h1 className={textVariants({ size: "h3" })}>Asignar QR a {data.name}</h1>
                        <p className="capitalize mt-2">Escanea el QR para asignarlo a este usuario</p>
                    </div>
                </section>
                <section className="flex-1 relative">
                    <Scanner
                        classNames={{
                            "container": "size-full",
                        }}
                        onScan={(code) => {
                            setState("verifying");

                            toast.promise(assignCodeQR(params.participant as string, code[0].rawValue), {
                                loading: "Asignando código...",
                                success: (data) => {
                                    if (data === true) {
                                        setState("success");
                                        setCode(code[0].rawValue);
                                        setData((prev) => ({ ...prev, code: code[0].rawValue }));
                                        return "Código asignado correctamente"
                                    }
                                    setState("error");
                                    setCode(code[0].rawValue);
                                    return data as string;
                                },
                                error: () => {
                                    setState("error");
                                    return "Error al asignar código"
                                }
                            })
                        }}
                        formats={["qr_code"]}
                    />
                    <div className={cn("absolute top-0 inset-x-0 h-10 flex items-center justify-center", {
                        'bg-white text-black': state === 'idle',
                        'bg-blue-500 text-white': state === 'verifying',
                        'bg-green-500 text-white': state === 'success',
                        'bg-red-500 text-white': state === 'error',
                    })}>    
                        {state === 'idle' && 'Escaneando'}
                        {state === 'verifying' && 'Verificando'}
                        {state === 'success' && 'QR Válido'}
                        {state === 'error' && `QR No Válido: ${code}`}
                    </div>
                </section>
            </div>
        )
    }

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
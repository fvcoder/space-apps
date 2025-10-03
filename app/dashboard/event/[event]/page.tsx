"use client";

import { cn } from '@/lib/utils';
import { Scanner } from '@yudiel/react-qr-scanner';
import { useState } from 'react';
import { toast } from 'sonner';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import { AllowFeatures, registerParticipantEvent } from './actions';

const allowItems = [
    "extra",
    "launch1",
    "dinner",
    "breakfast",
    "launch2"
]


export default function ScanPage() {
    const [code, setCode] = useState("")
    const [state, setState] = useState<"idle" | "verifying" | "success" | "error" | "warn">("idle");
    const [message, setMessage] = useState("");
    const router = useRouter();
    const params = useParams();
    const session = useSession();

    if (params.event && !Array.isArray(params.event) && !allowItems.includes(params.event)) {
        router.push("/dashboard/event")
    }

    return (
        <div className='size-full bg-black flex-1 relative'>
            <Scanner
                onScan={(code) => {
                    setCode(code[0].rawValue ?? "")
                    setState("verifying");
                    setMessage("Verificando...");

                    toast.promise(registerParticipantEvent(code[0].rawValue, params.event as AllowFeatures, session.data?.session.userId as string), {
                        loading: "Verificando...",
                        success: (data) => {
                            if (typeof data === "object") {
                                alert(`Paquete: ${data.package}`)
                                setMessage("Registrado correctamente");
                                setState("success");
                                return data.message;
                            }
                            setMessage(data);
                            if (data === "Evento invalido") {
                                setState("error")
                            }
                            if (data === "Participante no encontrado") {
                                setState("error")
                            }
                            if (data === "Ya fue entregado") {
                                setState("warn")
                            }
                            if (data === "Registrado correctamente") {
                                setState("success")
                            }
                            return data;
                        },
                        error: () => {
                            setState("error");
                            return "Error al verificar";
                        }
                    })
                }}
                formats={["qr_code"]}
                classNames={{
                    container: "!aspect-auto"
                }}
             />
            <div className={cn("absolute top-0 inset-x-0 h-10 flex items-center justify-center", {
                'bg-white text-black': state === 'idle',
                'bg-blue-500 text-white': state === 'verifying',
                'bg-green-500 text-white': state === 'success',
                'bg-red-500 text-white': state === 'error',
                'bg-yellow-500 text-black': state === 'warn',
            })}>
                {state === 'idle' ? 'Escaneando' : message}
            </div>
        </div>
    )
}
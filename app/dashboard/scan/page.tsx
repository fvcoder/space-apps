"use client";
import { cn } from '@/lib/utils';
import { Scanner } from '@yudiel/react-qr-scanner';
import { useState } from 'react';
import { toast } from 'sonner';
import { verifyCodeQR } from './actions';
import { useRouter } from 'next/navigation';

export default function ScanPage() {
    const [code, setCode] = useState("")
    const [state, setState] = useState<"idle" | "verifying" | "success" | "error">("idle");
    const router = useRouter();

    return (
        <div className='size-full bg-black flex-1 relative'>
            <Scanner
                onScan={(code) => {
                    setCode(code[0].rawValue ?? "")
                    setState("verifying");

                    toast.promise(verifyCodeQR(code[0].rawValue), {
                        loading: "Verificando...",
                        success: (data) => {
                            if (data) {
                                setState("success");
                                router.push(`/dashboard/p/${data}`);
                                return "QR Valido";
                            } else {
                                setState("error");
                                return "QR no válido";
                            }
                        },
                        error: () => {
                            setState("error");
                            return "Error al verificar";
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
        </div> 
    )
}
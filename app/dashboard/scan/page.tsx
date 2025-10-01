"use client";
import { cn } from '@/lib/utils';
import { Scanner } from '@yudiel/react-qr-scanner';
import { useState } from 'react';

export default function ScanPage() {
    const [code, setCode] = useState("")

    return (
        <div className='size-full bg-black flex-1 relative'>
            <Scanner
                onScan={(code) => {
                    setCode(code[0].rawValue ?? "");
                }}
                formats={["qr_code"]}
                allowMultiple
             />
            <div className={cn("absolute top-0 inset-x-0 h-10 flex items-center justify-center", {
                'bg-white text-black': code === '',
                'bg-blue-500 text-white': code !== '',
            })}>
                {code === '' ? 'Esperando...' : `Verificando: ${code}`}
            </div>
        </div>
    )
}
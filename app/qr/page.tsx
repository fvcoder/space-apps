"use client";
import QRCode from "react-qr-code";

export default function GenQR() {
    return (
        <div className="bg-white p-4 print:p-0">
            <div className="grid grid-cols-5 gap-4 print:grid-cols-5">
                {Array.from({ length: 35 }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center justify-center" style={{ width: "3cm", height: "3cm" }}>
                        <QRCode value={Math.random().toString(36).substring(2, 12)} size={113} />
                    </div>
                ))}
            </div>
        </div>
    )
}
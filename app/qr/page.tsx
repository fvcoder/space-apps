"use client";
import QRCode from "react-qr-code";

export default function GenQR() {
    return (
        <div className="bg-white grid grid-cols-4 gap-10 max-w-7xl place-items-center p-10 mx-auto">
            {Array.from({ length: 10 }).map((_, i) => (
                <div key={i}>
                    <QRCode value={Math.random().toString(36).substring(2, 12)} />
                </div>
            ))}
        </div>
    )
}
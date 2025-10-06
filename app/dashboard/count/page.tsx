import { prisma } from "@/lib/auth"

export default async function CountPage() {
    const q = await prisma.p.count({
        where: {
            code: {
                not: null
            }
        }
    })

    const s = await prisma.p.count({
        where: {
            code: {
                not: null,
            },
            package: "strelka"
        }
    })

    const f = await prisma.p.count({
        where: {
            code: {
                not: null,
            },
            package: "felicette"
        }
    })

    
    
    return (
        <div>
            "Acreditados", {q} <br />
            "Paquetes strelka", {s} <br />
            "Paquetes felicette", {f}<br />
        </div>
    )
}
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
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

    console.log("Acreditados", q)
    console.log("Paquetes strelka", s)
    console.log("Paquetes felicette", f)
} 

main()
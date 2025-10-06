import { randomUUID } from "crypto";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { PrismaClient } from "@prisma/client"
import Excel from "exceljs"

const prisma = new PrismaClient();

async function main() {
    const s = await prisma.p.findMany({
        where: {
            "OR": [
                { type: "lider" }, 
                { type: "mentor" }, 
                { type: "voluntario" }, 
            ]
        },
        include: {
            items: true,
        },
        orderBy: {
            type: "desc"
        }
    })


    const workbook = new Excel.Workbook();
    
    const sheet = workbook.addWorksheet("Reporte de consumo");

    sheet.addRow(["Nombre", "Rol", "Acreditado", "Paquete", "Almuerzo (Dia 1)", "Cena (Dia 1)", "Desayuno (Dia 2)", "Almuerzo (Dia 2)"])

    for(let p of s) {
        const l1 = Boolean(p.items.find((x) => x.type == "launch1" && !!x.deliveredDate)?.deliveredDate)
        const d1 = Boolean(p.items.find((x) => x.type == "dinner" && !!x.deliveredDate)?.deliveredDate)
        const bf = Boolean(p.items.find((x) => x.type == "breakfast" && !!x.deliveredDate)?.deliveredDate)
        const l2 = Boolean(p.items.find((x) => x.type == "launch2" && !!x.deliveredDate)?.deliveredDate)

        sheet.addRow([
            p.name,
            p.type,
            p.code ? "Si": "No",
            p.package,
            l1 ? "Si": "No",
            d1 ? "Si": "No",
            bf ? "Si": "No",
            l2 ? "Si": "No",
        ])

        
    }
    

    await workbook.xlsx.writeFile(join(process.cwd(), "report.xlsx"));

    console.log(s)
}

main();
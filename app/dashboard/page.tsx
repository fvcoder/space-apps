import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { prisma } from "@/lib/auth"
import Link from "next/link"

export default async function Page() {
  const data = await prisma.participant.findMany({ orderBy: { createAt: "desc" } })

  return (
    <div className="flex flex-1 flex-col">
      <div className="px-6 mx-auto w-full max-w--3xl py-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Paquete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  <Link href={`/dashboard/p/${p.id}`} className="font-medium hover:underline">
                    {p.name}
                  </Link>
                </TableCell>
                <TableCell className="capitalize">{p.type}</TableCell>
                <TableCell className="capitalize">{p.package}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

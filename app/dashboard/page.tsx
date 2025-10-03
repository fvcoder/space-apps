import { prisma } from "@/lib/auth"
import { textVariants } from "@/style/text"
import { ParticipantsTable } from "./table"
  
export default async function Page() {
  const data = await prisma.p.findMany({ orderBy: { createAt: "desc" } });
  const countParticipants = await prisma.p.count({});
  const countPresents = await prisma.p.count({ where: { code: { not: null } } });

  return (
    <div className="flex flex-1 flex-col">
      <div className="px-6 mx-auto w-full space-y-2 py-4">
        <header>
          <h1 className={textVariants({ size: "h3" })}>Lista de participantes</h1>
          <p className={textVariants({ color: "secondary" })}>{countParticipants} Registros - {countPresents} Acreditados</p>
        </header>
        <ParticipantsTable data={data} />
      </div>
    </div>
  )
}

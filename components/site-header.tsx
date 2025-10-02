"use client";
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useParams } from "next/navigation";

const eventList: Record<string, string>  = {
  "extra": "Accesorios",
  "launch1": "Almuerzo Dia 1",
  "dinner": "Cena",
  "breakfast": "Desayuno",
  "launch2": "Almuerzo Dia 2"
}

export function SiteHeader() {
  const params = useParams();
  
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{params.event ? eventList[params.event as string] ?? "Desconocido" : "Panel de Control"}</h1>
      </div>
    </header>
  )
}

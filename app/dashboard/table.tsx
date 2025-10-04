"use client";

import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { IconCircleCheck } from "@tabler/icons-react"
import Link from "next/link"
import type { p } from "@prisma/client"
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

function normalizeText(text: string) {
  if (!text) return '';
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function ParticipantsTable({ data }: { data: p[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;
  
  const filteredData = useMemo(() => {
    if (!searchTerm) {
      return data;
    }
    const normalizedSearchTerm = normalizeText(searchTerm);
    
    return data.filter(item => {
      return normalizeText(item.name).includes(normalizedSearchTerm);
    });
  }, [data, searchTerm]);
  
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, itemsPerPage]);
    
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

    return (
        <>
            <section>
                <Input
                  placeholder="Buscar participante"
                  value={searchTerm}
                  onChange={e => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
            </section>
            <Table>
                <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Paquete</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedData.map((p, i) => (
                      <TableRow key={`${p.id}-${i}`}>
                        <TableCell>
                          <Link href={`/dashboard/p/${p.id}`} className="font-medium hover:underline flex items-center gap-1.5">
                            {p.code && <IconCircleCheck className="size-4 inline-block text-green-500" />}
                            <span>
                              {p.name}
                            </span>
                          </Link>
                        </TableCell>
                        <TableCell className="capitalize">{p.type}</TableCell>
                        <TableCell className="capitalize">{p.package}</TableCell>
                      </TableRow>
                    ))}
                    {paginatedData.length === 0 && searchTerm && (
                      <TableRow>
                        <TableCell colSpan={3}>No se encontraron resultados.</TableCell>
                      </TableRow>
                    )}
                    {paginatedData.length === 0 && !searchTerm && data.length > 0 && (
                      <TableRow>
                        <TableCell colSpan={3}>Busca algo...</TableCell>
                      </TableRow>
                    )}
                </TableBody>
            </Table>
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-4">
                <Button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Anterior
                </Button>
                <span>
                  Página {currentPage} de {totalPages}
                </span>
                <Button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Siguiente
                </Button>
              </div>
            )}
        </>
    )
}
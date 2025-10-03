"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema, Schema } from "./schema";
import { registerParticipant } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { textVariants } from "@/style/text";

export default function RegisterUser() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  function handleOnSubmit(data: Schema) {
    setLoading(true)
    toast.promise(registerParticipant(data), {
      loading: "Registrando...",
      success: (dta) => {
        if (typeof dta === "string") {
            router.push(`/dashboard/p/${dta}`)
            setLoading(false)

            return "Registrado con éxito"
        }
        setLoading(false)
        return "Hubo un error"
      },
      error: () => {
        setLoading(false)
        return "Error al registrar"
      }
    });
  }

  return (
    <div className="max-w-3xl px-6 mx-auto py-4 w-full space-y-4">
      <header>
        <h1 className={textVariants({ size: "h3" })}>Registra un participante</h1>
        <p className={textVariants({ color: "secondary" })}>Rellena el formulario</p>
      </header>
      <form onSubmit={handleSubmit(handleOnSubmit)} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Nombre</Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input id="name" placeholder="Ingresa tu nombre" {...field} />
            )}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="type">Tipo</Label>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="type" className="w-full">
                    <SelectValue placeholder="Selecciona un tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mentor">Mentor</SelectItem>
                    <SelectItem value="voluntario">Voluntario</SelectItem>
                    <SelectItem value="lider">Líder</SelectItem>
                    <SelectItem value="participante">Participante</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="package">Paquete Adquirido</Label>
            <Controller
              name="package"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="package" className="w-full">
                    <SelectValue placeholder="Selecciona un paquete" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="felicette">FÉLICETTE</SelectItem>
                    <SelectItem value="strelka">STRELKA</SelectItem>
                    <SelectItem value="sin paquete">Sin paquete</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.package && <p className="text-red-500 text-sm">{errors.package.message}</p>}
          </div>
        </div>
        <Button type="submit" disabled={loading}>Registrar</Button>
      </form>
    </div>
  );
}
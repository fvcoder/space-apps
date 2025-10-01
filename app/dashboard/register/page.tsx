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
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

const schema = z.object({
    name: z.string({ error: "Campo requerido" }).min(3, { error: "Minimo 3 caracteres"}),
    type: z.string({ error: "Campo requerido" }),
    package: z.string({ error: "Campo requerido" }),
})

type Schema = z.infer<typeof schema>;

export default function RegisterUser() {
    const [code, setCode] = useState();
    const form = useForm<Schema>({ resolver: zodResolver(schema) })

    function handleOnSubmit(data: Schema) {
        console.log(data)
    }

    return (
        <div className="max-w-3xl px-6 mx-auto py-4 w-full">
            <form className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input id="nombre" placeholder="Ingresa tu nombre" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="tipo">Tipo</Label>
                        <Select>
                            <SelectTrigger id="tipo" className="w-full">
                                <SelectValue placeholder="Selecciona un tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="mentor">Mentor</SelectItem>
                                <SelectItem value="voluntario">Voluntario</SelectItem>
                                <SelectItem value="lider">Líder</SelectItem>
                                <SelectItem value="participante">Participante</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="paquete">Paquete Adquirido</Label>
                        <Select>
                            <SelectTrigger id="paquete" className="w-full">
                                <SelectValue placeholder="Selecciona un paquete" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="stela">Stela</SelectItem>
                                <SelectItem value="erika">Erika</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <Button type="submit">Registrar</Button>
            </form>
        </div>
    )
}
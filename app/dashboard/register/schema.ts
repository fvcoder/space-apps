import z from "zod"

export const schema = z.object({
    name: z.string({ error: "Campo requerido" }).min(3, { error: "El nombre debe tener al menos 3 caracteres." }),
    type: z.string({ error: "Por favor selecciona un tipo." }),
    package: z.string({ error: "Por favor selecciona un paquete." }),
  });
  
export type Schema = z.infer<typeof schema>;
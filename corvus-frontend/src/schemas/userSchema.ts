import {z} from "zod";

export const userSchema = z.object({
    email: z.string().email("Ingresa un correo electrónico válido"),
    password: z.string().min(10, "La contraseña debe contener al menos 10 caracteres")
});

export type typeUserSchema = z.infer<typeof userSchema>;
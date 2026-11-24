
import { z } from "zod";

// import { z } from "zod";

export const eventSchema = z.object({
    title: z.string()
        .min(1, 'El título es obligatorio')
        .max(150, 'El título no puede superar 150 caracteres'),

    date: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'La fecha debe tener formato YYYY-MM-DD'),

    location: z.string()
        .min(1, 'El lugar es obligatorio')
        .max(200, 'El lugar no puede superar 200 caracteres'),

    startTime: z.string()
        .regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'La hora de inicio debe tener formato HH:mm'),

    endTime: z.string()
        .regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'La hora de finalización debe tener formato HH:mm')
});

// export const eventSchema = z.object({
//     location: z.string()
//         .trim()
//         .min(1, "Se requiere la ubicación del evento"),

//     date: z.iso.date("Fecha no válida. Ingresa una fecha válida"),

//     startTime: z.string()
//         .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Hora de inicio no válida"),

//     endTime: z.string()
//         .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Hora de finalización no válida")
// }).refine(
//     (event) => event.endTime > event.startTime,
//     {
//         message: "La hora de finalización debe ser posterior a la de inicio",
//         path: ["endTime"]
//     }
// );

export type EventSchema = z.infer<typeof eventSchema>;


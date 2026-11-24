import {z} from "zod";

export const MAX_PRODUCT_IMAGES = 4;

const isValidPrice = (value: string) => !Number.isNaN(Number(value)) && Number(value) >= 0;
const isValidStock = (value: string) => Number.isInteger(Number(value)) && Number(value) >= 0;

const imagesField = z
	.custom<FileList>((value) => value instanceof FileList, 'Archivo no válido')
	.refine((files) => files.length <= MAX_PRODUCT_IMAGES, `Máximo ${MAX_PRODUCT_IMAGES} imágenes`)
	.refine(
		(files) => Array.from(files).every((file) => file.type.startsWith('image/')),
		'Solo se permiten imágenes'
	);

// create: every field is required
export const createProductSchema = z.object({
	name: z.string().trim().min(1, 'El nombre es obligatorio'),
	categoryId: z.string().min(1, 'Selecciona una categoría'),
	price: z.string().min(1, 'El precio es obligatorio').refine(isValidPrice, 'Precio no válido'),
	stock: z.string().min(1, 'La cantidad es obligatoria').refine(isValidStock, 'Debe ser un entero mayor o igual a 0'),
	description: z.string().trim().min(1, 'La descripción es obligatoria'),
	images: imagesField.refine((files) => files.length >= 1, 'Agrega al menos una imagen'),
});

// edit: same shape, but empty means "do not change this field"
export const editProductSchema = z.object({
	name: z.string().trim(),
	categoryId: z.string(),
	price: z.string().refine((value) => value === '' || isValidPrice(value), 'Precio no válido'),
	stock: z.string().refine((value) => value === '' || isValidStock(value), 'Debe ser un entero mayor o igual a 0'),
	description: z.string().trim(),
	images: imagesField,
});

export type ProductSchema = z.infer<typeof createProductSchema>;

// export const productSchema = z.object({
//     name: z.string()
//         .min(1, "El nombre es obligatorio"),

//     description: z.string()
//         .min(1, "La descripción es obligatoria"),

//     categoryId: z.number()
//         .int("Selecciona una categoría válida")
//         .positive("Selecciona una categoría"),

//     price: z.number()
//         .positive("El precio debe ser mayor que cero"),

//     stock: z.number()
//         .int("Las unidades deben ser un número entero")
//         .min(0, "Las unidades no pueden ser negativas"),

//     images: z.array(z.instanceof(File))
//         .min(1, "Selecciona al menos una imagen")
//         .max(4, "Un producto admite máximo 4 imágenes")
// });

// export type ProductSchema = z.infer<typeof productSchema>;
import type { ProductSchema } from '../schemas/productSchema';

export const buildProductFormData = ({ images, ...fields }: ProductSchema) => {
	const formData = new FormData();

	Object.entries(fields).forEach(([key, value]) => {
		const trimmed = value.trim();
		if (trimmed !== '') formData.append(key, trimmed);
	});

	// the field name must match the upload middleware (upload.array('images', 4))
	Array.from(images).forEach((file) => formData.append('images', file));

	return formData;
};
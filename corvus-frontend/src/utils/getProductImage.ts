// utils/getProductImage.ts
import { API_URL } from '../services/AxiosService';
import type { Product } from '../models';

// the API origin (e.g. http://localhost:3000), without the /api/v1 prefix
const API_ORIGIN = new URL(API_URL).origin;

const getProductImage = ({ images }: Product) => {
	if (!images?.length) return '';

	// the first image is the one with the lowest position
	const [first] = [...images].sort((a, b) => a.position - b.position);

	return `${API_ORIGIN}${first.url}`;
};

export default getProductImage;
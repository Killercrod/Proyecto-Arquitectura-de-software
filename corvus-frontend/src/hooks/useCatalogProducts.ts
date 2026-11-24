import { useEffect, useState } from 'react';
import axios from 'axios';
import { getProducts, getProductsCatalog } from '../services/ProductService';
import type { Product } from '../models';
import type { ApiResponse } from '../models/apiResponse';

export type PaginationInfo = NonNullable<ApiResponse<Product[]>['pagination']>;

type UseCatalogProductsParams = {
	page: number;
	limit: number;
	search: string;
};

const useCatalogProducts = ({ page, limit, search }: UseCatalogProductsParams) => {
	const [products, setProducts] = useState<Product[]>([]);
	const [pagination, setPagination] = useState<PaginationInfo | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		let ignore = false;
		const { call, controller } = getProductsCatalog({ page, limit, search: search || undefined });

		const load = async () => {
			setLoading(true);
			setError(false);
			try {
				const { data } = await call;
				if (ignore) return;
				setProducts(data.data);
				setPagination(data.pagination ?? null);
			} catch (err) {
				if (ignore || axios.isCancel(err)) return;
				setError(true);
			} finally {
				if (!ignore) setLoading(false);
			}
		};

		void load();

		return () => {
			ignore = true;
			controller.abort();
		};
	}, [page, limit, search]);

	return { products, pagination, loading, error };
};

export default useCatalogProducts;
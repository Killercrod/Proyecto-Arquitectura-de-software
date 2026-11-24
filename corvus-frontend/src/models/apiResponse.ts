// models/apiResponse.ts  (export it from models/index.ts)
// models/apiResponse.ts
export interface Pagination {
	limit: number;
	page: number;
	total: number;
	totalPages: number;
}

export interface ApiResponse<T> {
	success: boolean;
	message?: string;
	data: T;
	pagination?: Pagination;
}
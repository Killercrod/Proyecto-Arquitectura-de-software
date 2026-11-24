import { type Product, type UseApiCall } from "../models";
import axios from "axios";
import { apiAxios } from "./AxiosService";
import { loadAbort } from "../utils/loadAbort";
import { type ApiResponse } from "../models/apiResponse";
// services/ProductService.ts
// import type { Product } from "../models";
// import { apiAxios } from "./AxiosService";
import { withAbort } from "../utils/withAbort";

// este funciona
export const getProducts = () =>
    withAbort<ApiResponse<Product[]>>(
        (signal) => apiAxios.get("/products", { signal })
    );


type ProductsParams = { page?: number; limit?: number; search?: string };

export const getProductsCatalog = (params?: ProductsParams) =>
	withAbort<ApiResponse<Product[]>>((signal) =>
		apiAxios.get("/products", { params, signal })
	); 


export const getProductById = (id: number) =>
  withAbort<Product>((signal) => apiAxios.get(`/products/${id}`, { signal }));

export const createProduct = (data: FormData) =>
  withAbort<Product>((signal) => apiAxios.post("/products", data, { signal }));

export const updateProduct = ({ id, data }: { id: number; data: FormData }) =>
  withAbort<Product>((signal) => apiAxios.patch(`/products/${id}`, data, { signal }));

export const deleteProduct = (id: number) =>
  withAbort<void>((signal) => apiAxios.delete(`/products/${id}`, { signal }));
// const BASE_URL = "https/softuniverse.com/api";


// services/CategoryService.ts
import type { Category } from "../models";
import type { ApiResponse } from "../models/apiResponse";
import { apiAxios } from "./AxiosService";
import { withAbort } from "../utils/withAbort";

// export const getCategories = () =>
//   withAbort<Category[]>((signal) => apiAxios.get("/categories", { signal }));

// services/CategoryService.ts


export const getCategories = () =>
  withAbort<ApiResponse<Category[]>>((signal) => apiAxios.get("/categories", { signal }));
// services/AdminService.ts
// import type { AdminLogin, AdminRegister, AuthResponse } from "../models";
import type { AdminLogin, AdminRegister, AuthResponse } from "../models/AdminType";
import { apiAxios } from "./AxiosService";
import { withAbort } from "../utils/withAbort";
import {type Admin} from "../models/AdminType"
import { type ApiResponse } from "../models/apiResponse";

export const login = (body: AdminLogin) =>
  withAbort<AuthResponse>((signal) => apiAxios.post("/admins/login", body, { signal }));

export const registerAdmin = (body: AdminRegister) =>
  withAbort<{ success: boolean; message: string }>((signal) =>
    apiAxios.post("/admins", body, { signal })
  );

export const getAdmins = () =>
  withAbort<ApiResponse<Admin[]>>((signal) => apiAxios.get("/admins", { signal }));
// utils/withAbort.ts
import type { AxiosResponse } from "axios";
import type { UseApiCall } from "../models";
import { loadAbort } from "./loadAbort";

export const withAbort = <T,>(
  fn: (signal: AbortSignal) => Promise<AxiosResponse<T>>
): UseApiCall<T> => {
  const controller = loadAbort();
  return { call: fn(controller.signal), controller };
};
// hooks/useMutation.ts
import { useCallback, useState } from "react";
import type { UseApiCall } from "../models";

export const useMutation = <T, P = void>(apiCall: (param: P) => UseApiCall<T>) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const mutate = useCallback(async (param: P): Promise<T> => {
    const { call } = apiCall(param);
    setLoading(true);
    setError(null);
    try {
      const res = await call;
      return res.data;
    } catch (err) {
      setError(err);
      throw err; // el componente decide qué mostrar
    } finally {
      setLoading(false);
    }
  }, [apiCall]);

  return { mutate, loading, error };
};
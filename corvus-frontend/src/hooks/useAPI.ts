// import { UseApiCall } from "../models";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { type UseApiCall } from "../models";

type UseApiOptions<P> = {
  autoFetch?: boolean;
  params?: P;
};

type Data<T> = T | null;
type CustomError = Error | null;

type UseApiResult<T, P> = {
  loading: boolean;
  data: Data<T>;
  error: CustomError;
  fetch: (param: P) => () => void;
};

export const useApi = <T, P = void>(
  apiCall: (param: P) => UseApiCall<T>,
  options?: UseApiOptions<P>
): UseApiResult<T, P> => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Data<T>>(null);
  const [error, setError] = useState<CustomError>(null);

  const autoFetch = options?.autoFetch;
  const initialParams = useRef(options?.params);

  const fetch = useCallback((param: P) => {
    const { call, controller } = apiCall(param);
    setLoading(true);

    call
      .then((response) => {
        setData(response.data);
        setError(null);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setError(err);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [apiCall]);

  useEffect(() => {
    if (!autoFetch) return undefined;
    return fetch(initialParams.current as P);
  }, [fetch, autoFetch]);

  return { loading, data, error, fetch };
};
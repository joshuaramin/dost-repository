"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface AxiosHeaders {
  [key: string]: string | undefined;
}

type Props<TVariables, TData> = {
  key: unknown[];
  url: string;
  enabled?: boolean;
  headers?: AxiosHeaders;
  params?: TVariables;
};

const useFormQuery = <TData = unknown, TVariables = unknown>({
  key,
  url,
  headers,
  enabled = true,
  params,
}: Props<TVariables, TData>) => {
  return useQuery<TData>({
    queryKey: [...key, params],
    enabled: enabled && Boolean(url),

    queryFn: async () => {
      const response = await axios.get<TData>(url, {
        headers,
        params,
      });

      return response.data;
    },
  });
};

export default useFormQuery;

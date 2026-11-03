"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

type Props<TVariables, TData> = {
  key: unknown[];
  url: string;
  enabled?: boolean;
  headers?: Record<string, string | undefined>;
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
    queryKey: [...key, url, params],
    enabled: enabled && Boolean(BASE_URL) && Boolean(url),

    queryFn: async () => {
      if (!BASE_URL) {
        throw new Error("NEXT_PUBLIC_BASE_URL is not configured.");
      }

      if (!url) {
        throw new Error("API endpoint is required.");
      }

      const endpoint = `${BASE_URL.replace(/\/+$/, "")}/${url.replace(/^\/+/, "")}`;

      const response = await axios.get<TData>(endpoint, {
        headers,
        params,
      });

      return response.data;
    },
  });
};

export default useFormQuery;

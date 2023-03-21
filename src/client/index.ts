import * as t from "zod";
import { fromZodError } from "zod-validation-error";
import axios, { AxiosResponse } from "axios";

import { getToken } from "@/lib/auth";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
});

export const authenticatedAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

authenticatedAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      const token = getToken();

      if (token) {
        authenticatedAPI.defaults.headers.common.Authorization = `Bearer ${token}`;
      }
    }

    return error;
  },
);

export function decodeResponse<T>(
  { data }: AxiosResponse<T>,
  decoder: t.Schema<T>,
): T {
  const result = decoder.safeParse(data);

  if (result.success) return result.data;

  const error = fromZodError(result.error);

  throw new Error(error.message);
}

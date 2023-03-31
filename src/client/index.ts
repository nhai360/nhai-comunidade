import * as t from "zod";
import { fromZodError } from "zod-validation-error";
import axios, { AxiosResponse } from "axios";

import {
  authorizationInterceptor,
  getToken,
  refreshTokenInterceptor,
} from "@/lib/auth";

console.log(process.env.NEXT_PUBLIC_BASE_API_URL);

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
  authorizationInterceptor,
);

authenticatedAPI.interceptors.response.use(
  (response) => response,
  refreshTokenInterceptor,
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

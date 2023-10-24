import * as t from "zod";
import https from 'https'
import { fromZodError } from "zod-validation-error";
import axios, { AxiosResponse } from "axios";

import {
  authorizationInterceptor,
  getToken,
  refreshTokenInterceptor,
} from "@/lib/auth";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  httpsAgent: new https.Agent({ keepAlive: true }),
  timeout: 30000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Credentials': true
  },
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

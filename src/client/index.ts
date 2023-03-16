import * as t from "zod";
import { fromZodError } from "zod-validation-error";

import axios, { AxiosResponse } from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3010/v1/",
});

export function decodeResponse<T>(
  { data }: AxiosResponse<T>,
  decoder: t.Schema<T>,
): T {
  const result = decoder.safeParse(data);

  if (result.success) return result.data;

  const error = fromZodError(result.error);

  throw new Error(error.message);
}

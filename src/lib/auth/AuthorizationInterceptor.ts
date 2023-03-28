import { AxiosError } from "axios";

import { authenticatedAPI } from "@/client";

import { getToken } from "./getToken";

export async function authorizationInterceptor(error: AxiosError) {
  if (error?.response?.status === 401) {
    const token = getToken();

    if (token) {
      authenticatedAPI.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  }

  return Promise.reject(error);
}

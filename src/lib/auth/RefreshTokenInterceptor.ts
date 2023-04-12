import axios, { AxiosError } from "axios";

import { api, authenticatedAPI } from "@/client";

import { getSession } from "./getSession";
import { logout } from "./logout";

export async function refreshTokenInterceptor(error: AxiosError) {
  console.log("error", error);

  if (error?.response?.status !== 401) {
    return Promise.reject(error);
  }

  const session = getSession();

  console.log(session);

  if (!session) {
    authenticatedAPI.defaults.headers.common.Authorization = undefined;
    return Promise.reject(error);
  }

  try {
    const response = await api.post("/auth/refresh", {
      userId: session.userId,
      refresh_token: session.refresh_token,
    });

    localStorage.setItem(
      "@nhai-comunidade:session",
      JSON.stringify({
        userId: session.userId,
        ...response.data,
      }),
    );

    const config = {
      ...error.config,
      headers: {
        ...error.config?.headers,
        Authorization: `Bearer ${response.data.access_token}`,
      },
    };

    return axios(config)
      .then((retrySuccess) => retrySuccess)
      .catch(() => {
        logout();

        return Promise.reject(error);
      });
  } catch {
    logout();

    return Promise.reject(error);
  }
}

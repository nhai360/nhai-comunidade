import { useMutation } from "react-query";

import {
  CreateSessionParams,
  Session,
  SessionDecoder,
} from "@/client/users/types";
import { api, authenticatedAPI, decodeResponse } from "@/client";

async function createSessionRequest({ email, password }: CreateSessionParams) {
  const response = await api.post("/auth/login", { email, password });

  return decodeResponse<Session>(response, SessionDecoder);
}

export function useCreateSession() {
  const { mutate: createSession, ...rest } = useMutation({
    mutationFn: createSessionRequest,
    onSuccess: (response) => {
      authenticatedAPI.defaults.headers.common.Authorization = `Bearer ${response.access_token}`;
    },
  });

  return {
    createSession,
    ...rest,
  };
}

import { useMutation } from "react-query";

import {
  CreateSessionParams,
  Session,
  SessionDecoder,
} from "@/client/users/types";
import { api, decodeResponse } from "@/client";

async function createSessionRequest({ email, password }: CreateSessionParams) {
  const response = await api.post("/auth/login", { email, password });

  return decodeResponse<Session>(response, SessionDecoder);
}

export function useCreateSession() {
  const { mutate: createSession, ...rest } = useMutation({
    mutationFn: createSessionRequest,
  });

  return {
    createSession,
    ...rest,
  };
}
import { api } from "@/client";
import { RecoverPasswordParams } from "../types";
import { useMutation } from "react-query";

async function recoverPasswordRequest(params: RecoverPasswordParams) {
  await api.post("/auth/recover", params);
}

export function useRecoverPassword() {
  const { mutate: recoverPassword, ...rest } = useMutation({
    mutationFn: recoverPasswordRequest,
  });

  return {
    recoverPassword,
    ...rest,
  };
}

import { api } from "@/client";
import { RecoverPasswordParams } from "../types";
import { useMutation } from "react-query";

import axios from "axios";

async function recoverPasswordRequest(params: RecoverPasswordParams) {
  // await api.post("/auth/recover", params);

  await axios.post('/api/recoverPassword', {
    body: JSON.stringify({ params }),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  })
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

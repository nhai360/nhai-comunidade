import { useMutation } from "react-query";

import { api, decodeResponse } from "@/client";
import { ResetPasswordAndUidParams } from "@/client/password";
import { User, UserDecoder } from "@/client/users";

async function resetPasswordRequest({
  uid,
  password,
}: ResetPasswordAndUidParams) {
  const response = await api.post(
    "/auth/reset",
    {
      password,
    },
    {
      params: {
        uid,
      },
    },
  );

  return decodeResponse<User>(response, UserDecoder);
}

export function useResetPassword() {
  const { mutate: resetPassword, ...rest } = useMutation({
    mutationFn: resetPasswordRequest,
  });

  return {
    resetPassword,
    ...rest,
  };
}

import { useMutation } from "react-query";

import { api, decodeResponse } from "@/client";

import { CreateUserParams, User, UserDecoder } from "@/client/users/types";

async function createUserRequest(params: CreateUserParams) {
  const response = await api.post("/auth/signup", {
    ...params,
    birthDate: new Date(params?.birthDate),
  });

  return response?.data;
  // return decodeResponse<User>(response, UserDecoder);
}

export function useCreateUser() {
  const { mutate: createUser, ...rest } = useMutation({
    mutationFn: createUserRequest,
  });

  return {
    createUser,
    ...rest,
  };
}

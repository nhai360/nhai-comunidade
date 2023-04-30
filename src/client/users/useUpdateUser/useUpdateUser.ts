import { useMutation, useQueryClient } from "react-query";

import { authenticatedAPI } from "@/client";
import { PatchParams } from "@/client/users/types";

import { invalidateUserQueries } from "..";

async function updateUserRequest({ userId, avatar, ...params }: PatchParams) {
  await authenticatedAPI.patch(`/users/${userId}`, {
    ...params,
    profilePicture: avatar,
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, ...rest } = useMutation({
    mutationFn: updateUserRequest,
    onSuccess: () => {
      invalidateUserQueries(queryClient);
    },
  });

  return {
    updateUser,
    ...rest,
  };
}

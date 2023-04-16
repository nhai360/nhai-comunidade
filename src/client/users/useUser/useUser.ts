import { UseQueryOptions, useQuery } from "react-query";

import { authenticatedAPI, decodeResponse } from "@/client";
import { GetParams, User, UserDecoder } from "@/client/users";

async function getUser({ id, nickname }: GetParams) {
  const url = nickname ? `/users/nickname/${nickname}` : `/users/${id}`;

  const response = await authenticatedAPI.get(url);

  return decodeResponse<User>(response, UserDecoder);
}

export function useUser(
  params: GetParams,
  options: UseQueryOptions<User> = {},
) {
  const { data: user, ...rest } = useQuery({
    enabled: !!params.id,
    queryKey: ["user", params],
    queryFn: () => getUser(params),
    ...options,
  });

  return {
    user,
    ...rest,
  };
}

export function useUserFromNickname(
  params: GetParams,
  options: UseQueryOptions<User> = {},
) {
  const { data: user, ...rest } = useQuery({
    enabled: !!params.nickname,
    queryKey: ["user", params],
    queryFn: () => getUser(params),
    ...options,
  });

  return {
    user,
    ...rest,
  };
}

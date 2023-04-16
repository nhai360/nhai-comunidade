import { authenticatedAPI, decodeResponse } from "@/client";
import { GetParams, User, UserDecoder } from "@/client/users";
import { UseQueryOptions, useQuery } from "react-query";

async function getUser({ id }: GetParams) {
  const response = await authenticatedAPI.get(`/users/${id}`);

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

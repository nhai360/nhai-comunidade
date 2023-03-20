import { api, decodeResponse } from "@/client";
import { GetParams, User, UserDecoder } from "@/client/users";
import { useQuery } from "react-query";

async function getUser({ id }: GetParams) {
  const response = await api.get(`/user/${id}`);

  return decodeResponse<User>(response, UserDecoder);
}

export function useUser(params: GetParams) {
  const { data: user, ...rest } = useQuery({
    queryKey: ["user", params],
    queryFn: () => getUser(params),
  });

  return {
    user,
    ...rest,
  };
}

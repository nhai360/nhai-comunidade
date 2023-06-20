import { useQuery } from "react-query";

import { authenticatedAPI, decodeResponse } from "@/client";
import { GetUserLivesParams, Live, LiveDecoder } from "@/client/lives/types";

async function getUserLives({ userId }: GetUserLivesParams) {
  const response = await authenticatedAPI.get(`/users/${userId}/guestLives`);

  return decodeResponse<Live[]>(response, LiveDecoder.array());
}

export function useUserLives({ userId }: GetUserLivesParams) {
  const { data: userlives, ...rest } = useQuery({
    enabled: !!userId,
    queryKey: ["userlives", { userId }],
    queryFn: () => getUserLives({ userId }),
  });

  return {
    userlives,
    ...rest,
  };
}

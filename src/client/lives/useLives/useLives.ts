import { useQuery } from "react-query";

import { authenticatedAPI, decodeResponse } from "@/client";
import { GetUserLivesParams, Live, LiveDecoder } from "@/client/lives/types";

async function getLives({ userId }: GetUserLivesParams) {
  const response = await authenticatedAPI.get(`/users/${userId}/guestLives`);

  return decodeResponse<Live[]>(response, LiveDecoder.array());
}

export function useLives({ userId }: GetUserLivesParams) {
  const { data: lives, ...rest } = useQuery({
    enabled: !!userId,
    queryKey: ["userlives", { userId }],
    queryFn: () => getLives({ userId }),
  });

  return {
    lives,
    ...rest,
  };
}

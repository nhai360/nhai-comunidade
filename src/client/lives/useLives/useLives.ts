import { useQuery } from "react-query";

import { authenticatedAPI, decodeResponse } from "@/client";
import { GetUserLivesParams, Live, LiveDecoder } from "@/client/lives/types";

async function getLives({ nickname }: GetUserLivesParams) {
  const response = await authenticatedAPI.get(`/users/${nickname}/lives`);

  return decodeResponse<Live[]>(response, LiveDecoder.array());
}

export function useLives({ nickname }: GetUserLivesParams) {
  const { data: lives, ...rest } = useQuery({
    enabled: !!nickname,
    queryKey: ["userlives", { nickname }],
    queryFn: () => getLives({ nickname }),
  });

  return {
    lives,
    ...rest,
  };
}

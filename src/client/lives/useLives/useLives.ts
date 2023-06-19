import { useQuery } from "react-query";

import { authenticatedAPI, decodeResponse } from "@/client";
import { GetUserLivesParams, Live, LiveDecoder } from "@/client/lives/types";

async function getLives() {
  const response = await authenticatedAPI.get(`/lives/getLiveSchedule`);

  return decodeResponse<Live[]>(response, LiveDecoder.array());
}

export function useLives() {
  const { data: lives, ...rest } = useQuery({
    queryKey: "lives",
    queryFn: () => getLives(),
  });

  return {
    lives,
    ...rest,
  };
}

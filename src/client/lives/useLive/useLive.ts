import { useQuery } from "react-query";

import { authenticatedAPI, decodeResponse } from "@/client";
import { GetLiveParams, Live, LiveDecoder } from "@/client/lives/types";

async function getLive({ liveId }: GetLiveParams) {
  const response = await authenticatedAPI.get(`/lives/${liveId}`);

  return decodeResponse<Live>(response, LiveDecoder);
}

export function useLive({ liveId }: GetLiveParams) {
  const { data: live, ...rest } = useQuery({
    enabled: !!liveId,
    queryKey: ["live", { liveId }],
    queryFn: () => getLive({ liveId }),
  });

  return {
    live,
    ...rest,
  };
}

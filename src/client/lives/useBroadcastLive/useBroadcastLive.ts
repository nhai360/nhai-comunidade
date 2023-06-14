import { useMutation, useQueryClient } from "react-query";

import { authenticatedAPI } from "@/client";
import { PostBroadcastParams, invalidateLivesQueries } from "@/client/lives";

async function startBroadcastRequest(params: PostBroadcastParams) {
  const response = await authenticatedAPI.post("/lives/start", {
    ...params,
  });

  return response.data;
}

async function stopBroadcastRequest(params: PostBroadcastParams) {
  const response = await authenticatedAPI.post("/lives/stop", {
    ...params,
  });

  return response.data;
}

export function useBroadcastLive() {
  const queryClient = useQueryClient();

  const { mutate: startBroadcast, ...restStart } = useMutation({
    mutationFn: startBroadcastRequest,
    onSuccess: () => {
      invalidateLivesQueries(queryClient);
    },
  });

  const { mutate: stopBroadcast, ...restStop } = useMutation({
    mutationFn: stopBroadcastRequest,
    onSuccess: () => {
      invalidateLivesQueries(queryClient);
    },
  });

  return {
    start: {
      startBroadcast,
      ...restStart,
    },
    stop: {
      stopBroadcast,
      ...restStop,
    },
  };
}

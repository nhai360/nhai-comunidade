import { useMutation, useQueryClient } from "react-query";

import { authenticatedAPI } from "@/client";
import { PostBroadcastParams, invalidateLiveQueries } from "@/client/lives";

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
      invalidateLiveQueries(queryClient);
    },
  });

  const { mutate: stopBroadcast, ...restStop } = useMutation({
    mutationFn: stopBroadcastRequest,
    onSuccess: () => {
      invalidateLiveQueries(queryClient);
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

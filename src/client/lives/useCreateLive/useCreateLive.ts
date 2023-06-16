import { useMutation, useQueryClient } from "react-query";

import { authenticatedAPI } from "@/client";
import { PostParams, invalidateLivesQueries } from "@/client/lives";

async function createLiveRequest(params: PostParams) {
  const response = await authenticatedAPI.post("/lives", {
    ...params,
  });

  return response.data;
}

export function useCreateLive() {
  const queryClient = useQueryClient();

  const { mutate: createLive, ...rest } = useMutation({
    mutationFn: createLiveRequest,
    onSuccess: () => {
      invalidateLivesQueries(queryClient);
    },
  });

  return {
    createLive,
    ...rest,
  };
}

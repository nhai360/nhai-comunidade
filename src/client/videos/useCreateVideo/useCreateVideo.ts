import { useMutation, useQueryClient } from "react-query";

import { authenticatedAPI } from "@/client";
import { PostParams, invalidateVideosQueries } from "@/client/videos";

async function createVideoRequest(params: PostParams) {
  const response = await authenticatedAPI.post("/videos", {
    ...params,
    source: { id: params?.source?.id },
  });

  return response.data;
}

export function useCreateVideo() {
  const queryClient = useQueryClient();

  const { mutate: createVideo, ...rest } = useMutation({
    mutationFn: createVideoRequest,
    onSuccess: () => {
      invalidateVideosQueries(queryClient);
    },
  });

  return {
    createVideo,
    ...rest,
  };
}

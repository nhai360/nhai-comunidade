import { useMutation, useQueryClient } from "react-query";

import { authenticatedAPI } from "@/client";
import { PatchParams, invalidateVideosQueries } from "@/client/videos";

async function updateVideoRequest({ videoId, ...params }: PatchParams) {
  await authenticatedAPI.patch(`/videos/${videoId}`, params);
}

export function useUpdateVideo() {
  const queryClient = useQueryClient();

  const { mutate: updateVideo, ...rest } = useMutation({
    mutationFn: updateVideoRequest,
    onSuccess: () => {
      invalidateVideosQueries(queryClient);
    },
  });

  return {
    updateVideo,
    ...rest,
  };
}

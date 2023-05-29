import { useMutation, useQueryClient } from "react-query";

import { authenticatedAPI } from "@/client";
import { DeleteVideoParams, invalidateVideosQueries } from "@/client/videos";

async function deleteVideoRequest({ videoId }: DeleteVideoParams) {
  await authenticatedAPI.delete(`/videos/${videoId}`);
}

export function useDeleteVideo() {
  const queryClient = useQueryClient();

  const { mutate: deleteVideo, ...rest } = useMutation({
    mutationFn: deleteVideoRequest,
    onSuccess: () => {
      invalidateVideosQueries(queryClient);
    },
  });

  return {
    deleteVideo,
    ...rest,
  };
}

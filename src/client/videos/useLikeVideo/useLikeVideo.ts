import { useMutation, useQueryClient } from "react-query";

import { authenticatedAPI } from "@/client";
import { LikeVideoParams, invalidateVideosQueries } from "@/client/videos";

async function likeVideoRequest({ videoId, alreadyLiked }: LikeVideoParams) {
  if (alreadyLiked) {
    await authenticatedAPI.post(`/videos/${videoId}/unlike`);
    return;
  }

  await authenticatedAPI.post(`/videos/${videoId}/like`);
}

export function useLikeVideo() {
  const queryClient = useQueryClient();

  const { mutate: likeVideo, ...rest } = useMutation({
    mutationFn: likeVideoRequest,
    onSuccess: () => {
      invalidateVideosQueries(queryClient);
    },
  });

  return {
    likeVideo,
    ...rest,
  };
}

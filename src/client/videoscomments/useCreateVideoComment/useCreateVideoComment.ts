import { useMutation, useQueryClient } from "react-query";

import { authenticatedAPI } from "@/client";
import {
  VideoCommentType,
  CreateVideoCommentParams,
  invalidateVideoCommentsQueries,
} from "@/client/videoscomments";
import { invalidateVideosQueries } from "@/client/videos";

async function createVideoCommentRequest({
  videoId,
  content,
  replyId,
  options,
  type = VideoCommentType.COMMENT,
}: CreateVideoCommentParams) {
  if (replyId) {
    await authenticatedAPI.post(`/videos/${videoId}/comments/${replyId}`, {
      content,
    });

    return;
  }
  await authenticatedAPI.post(`/videos/${videoId}/comments`, {
    content,
    options,
    type,
  });
}

export function useCreateVideoComment() {
  const queryClient = useQueryClient();

  const { mutate: createVideoComment, ...rest } = useMutation({
    mutationFn: createVideoCommentRequest,
    onSuccess: () => {
      invalidateVideosQueries(queryClient);
      invalidateVideoCommentsQueries(queryClient);
    },
  });

  return {
    createVideoComment,
    ...rest,
  };
}

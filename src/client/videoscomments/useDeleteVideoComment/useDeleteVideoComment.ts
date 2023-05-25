import { useMutation, useQueryClient } from "react-query";
import { authenticatedAPI } from "@/client";
import { DeleteParams } from "@/client/videoscomments/types";
import { invalidateVideosQueries } from "@/client/videos";

import { invalidateVideoCommentsQueries } from "..";

async function deleteCommentRequest({ commentId }: DeleteParams) {
  await authenticatedAPI.delete(`/comments/${commentId}`);
}

export function useDeleteComment() {
  const queryClient = useQueryClient();

  const { mutate: deleteComment, ...rest } = useMutation({
    mutationFn: deleteCommentRequest,
    onSuccess: () => {
      invalidateVideosQueries(queryClient);
      invalidateVideoCommentsQueries(queryClient);
    },
  });

  return {
    deleteComment,
    ...rest,
  };
}

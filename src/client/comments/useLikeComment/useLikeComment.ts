import { useMutation, useQueryClient } from "react-query";

import { authenticatedAPI } from "@/client";
import { invalidatePostsQueries } from "@/client/posts";
import { LikeCommentParams, invalidateCommentsQueries } from "..";

async function likeCommentRequest({
  commentId,
  alreadyLiked,
}: LikeCommentParams) {
  if (alreadyLiked) {
    await authenticatedAPI.post(`/comments/${commentId}/unlike`);
    return;
  }

  await authenticatedAPI.post(`/comments/${commentId}/like`);
}

export function useLikeComment() {
  const queryClient = useQueryClient();

  const { mutate: likeComment, ...rest } = useMutation({
    mutationFn: likeCommentRequest,
    onSuccess: () => {
      invalidatePostsQueries(queryClient);
      invalidateCommentsQueries(queryClient);
    },
  });

  return {
    likeComment,
    ...rest,
  };
}

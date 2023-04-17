import { useMutation, useQueryClient } from "react-query";

import { authenticatedAPI } from "@/client";
import {
  CreateCommentParams,
  invalidateCommentsQueries,
} from "@/client/comments";
import { invalidatePostsQueries } from "@/client/posts";

async function createCommentRequest({
  postId,
  content,
  replyId,
}: CreateCommentParams) {
  if (replyId) {
    await authenticatedAPI.post(`/posts/${postId}/comments/${replyId}`, {
      content,
    });

    return;
  }

  await authenticatedAPI.post(`/posts/${postId}/comments`, {
    content,
  });
}

export function useCreateComment() {
  const queryClient = useQueryClient();

  const { mutate: createComment, ...rest } = useMutation({
    mutationFn: createCommentRequest,
    onSuccess: () => {
      invalidatePostsQueries(queryClient);
      invalidateCommentsQueries(queryClient);
    },
  });

  return {
    createComment,
    ...rest,
  };
}

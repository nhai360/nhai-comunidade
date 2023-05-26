import { useMutation, useQueryClient } from "react-query";

import { authenticatedAPI } from "@/client";
import {
  CommentType,
  CreateCommentParams,
  invalidateCommentsQueries,
} from "@/client/comments";
import { invalidatePostsQueries } from "@/client/posts";

async function createCommentRequest({
  originId,
  content,
  replyId,
  options,
  type = CommentType.COMMENT,
  originType = "posts",
}: CreateCommentParams) {
  if (replyId) {
    await authenticatedAPI.post(
      `/${originType}/${originId}/comments/${replyId}`,
      {
        content,
      }
    );

    return;
  }

  await authenticatedAPI.post(`/${originType}/${originId}/comments`, {
    content,
    options,
    type,
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

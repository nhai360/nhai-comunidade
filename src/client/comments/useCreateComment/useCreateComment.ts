import { authenticatedAPI } from "@/client";
import { CreateCommentParams } from "@/client/comments";
import { invalidatePostsQueries } from "@/client/posts";
import { useMutation, useQueryClient } from "react-query";

async function createCommentRequest({ postId, content }: CreateCommentParams) {
  await authenticatedAPI.post(`/post/${postId}/comment`, {
    content,
  });
}

export function useCreateComment() {
  const queryClient = useQueryClient();

  const { mutate: createComment, ...rest } = useMutation({
    mutationFn: createCommentRequest,
    onSuccess: () => {
      invalidatePostsQueries(queryClient);
    },
  });

  return {
    createComment,
    ...rest,
  };
}

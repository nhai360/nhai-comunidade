import { useMutation, useQueryClient } from "react-query";

import { authenticatedAPI } from "@/client";
import { DeletePostParams, invalidatePostsQueries } from "@/client/posts";

async function deletePostRequest({ postId }: DeletePostParams) {
  await authenticatedAPI.delete(`/posts/${postId}`);
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  const { mutate: deletePost, ...rest } = useMutation({
    mutationFn: deletePostRequest,
    onSuccess: () => {
      invalidatePostsQueries(queryClient);
    },
  });

  return {
    deletePost,
    ...rest,
  };
}

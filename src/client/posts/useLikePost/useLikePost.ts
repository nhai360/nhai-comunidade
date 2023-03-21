import { useMutation, useQueryClient } from "react-query";

import { authenticatedAPI } from "@/client";
import { LikePostParams, invalidatePostsQueries } from "@/client/posts";

async function likePostRequest({ postId, alreadyLiked }: LikePostParams) {
  if (alreadyLiked) {
    await authenticatedAPI.post(`/post/${postId}/unlike`);
    return;
  }

  await authenticatedAPI.post(`/post/${postId}/like`);
}

export function useLikePost() {
  const queryClient = useQueryClient();

  const { mutate: likePost, ...rest } = useMutation({
    mutationFn: likePostRequest,
    onSuccess: () => {
      invalidatePostsQueries(queryClient);
    },
  });

  return {
    likePost,
    ...rest,
  };
}

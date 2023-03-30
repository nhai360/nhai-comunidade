import { useMutation, useQueryClient } from "react-query";

import { authenticatedAPI } from "@/client";
import {
  CreatePostRequestParams,
  invalidatePostsQueries,
} from "@/client/posts";

async function createPostRequest(params: CreatePostRequestParams) {
  await authenticatedAPI.post("/post", params);
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  const { mutate: createPost, ...rest } = useMutation({
    mutationFn: createPostRequest,
    onSuccess: () => {
      invalidatePostsQueries(queryClient);
    },
  });

  return {
    createPost,
    ...rest,
  };
}

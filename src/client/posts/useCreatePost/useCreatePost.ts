import { useMutation, useQueryClient } from "react-query";

import { authenticatedAPI } from "@/client";
import { CreatePostParams, invalidatePostsQueries } from "@/client/posts";

async function createPostRequest(params: CreatePostParams) {
  const response = await authenticatedAPI.post("/post", params);

  console.log(response.data);
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

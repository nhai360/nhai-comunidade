import { useQuery } from "react-query";
import { GetPostParams, Post, PostDecoder } from "@/client/posts";
import { authenticatedAPI, decodeResponse } from "@/client";

async function getPost({ postId }: GetPostParams) {
  const response = await authenticatedAPI.get(`/posts/${postId}`);

  return decodeResponse<Post>(response, PostDecoder);
}

export function usePost({ postId }: GetPostParams) {
  const { data: post, ...rest } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPost({ postId }),
  });

  return {
    post,
    ...rest,
  };
}

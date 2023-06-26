import { useQuery } from "react-query";

import { authenticatedAPI, decodeResponse } from "@/client";
import { GetUserPostsParams, Post, PostDecoder } from "@/client/posts/types";

export async function getUserPosts({
  orderBy = "createdAt",
  orderDirection = "desc",
  search,
  nickname,
}: GetUserPostsParams) {
  const response = await authenticatedAPI.get(`/users/${nickname}/posts`, {
    params: {
      orderBy: `${orderBy}:${orderDirection}`,
      search,
    },
  });

  return decodeResponse<Post[]>(response, PostDecoder.array());
}

export function useUserPosts(params: GetUserPostsParams) {
  const { data: posts, ...rest } = useQuery<Post[]>({
    queryKey: "user-posts",
    queryFn: () => getUserPosts(params),
  });

  return {
    posts,
    ...rest,
  };
}

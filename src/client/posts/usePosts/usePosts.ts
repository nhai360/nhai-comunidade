import { useQuery } from "react-query";

import { authenticatedAPI, decodeResponse } from "@/client";
import { GetParams, Post, PostDecoder } from "@/client/posts/types";

export async function getPosts({
  orderBy = "createdAt",
  orderDirection = "desc",
}: GetParams) {
  const response = await authenticatedAPI.get("/post", {
    params: {
      orderBy: `${orderBy}:${orderDirection}`,
    },
  });

  return decodeResponse<Post[]>(response, PostDecoder.array());
}

export function usePosts(params: GetParams = {}) {
  const { data: posts, ...rest } = useQuery<Post[]>({
    queryFn: () => getPosts(params),
    queryKey: ["posts", params],
  });

  return {
    posts,
    ...rest,
  };
}

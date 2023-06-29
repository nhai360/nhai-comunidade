import { useQuery } from "react-query";

import { authenticatedAPI, decodeResponse } from "@/client";
import { GetParams, Post, PostDecoder } from "@/client/posts/types";

export async function getPosts({
  orderBy = "createdAt",
  orderDirection = "desc",
  search,
}: GetParams) {
  const response = await authenticatedAPI.get("/posts", {
    params: {
      orderBy: `${orderBy}:${orderDirection}`,
      search,
    },
  });

  return decodeResponse<Post[]>(response, PostDecoder.array());
}

export function usePosts(params: GetParams = {}) {
  const { data: posts, ...rest } = useQuery<Post[]>({
    queryKey: "posts",
    queryFn: () => getPosts(params),
  });

  const removeAmstel = posts?.filter(
    (p) => p?.author?.nickname !== process.env.NEXT_PUBLIC_NEGOCIOS_DE_ORGULHO
  );

  return {
    posts: removeAmstel,
    ...rest,
  };
}

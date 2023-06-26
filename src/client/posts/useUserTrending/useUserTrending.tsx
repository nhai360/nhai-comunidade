import { useQuery } from "react-query";

import { authenticatedAPI, decodeResponse } from "@/client";
import { GetUserPostsParams, TrendPost, TrendPostDecoder } from "../types";

async function getUserTrending({ nickname }: GetUserPostsParams) {
  const response = await authenticatedAPI.get("/posts/trending");

  return decodeResponse<TrendPost[]>(response, TrendPostDecoder.array());
}

export function useUserTrending(params: GetUserPostsParams) {
  const { data: posts = [], ...rest } = useQuery({
    queryKey: ["user-trending"],
    queryFn: () => getUserTrending(params),
  });

  return {
    posts,
    ...rest,
  };
}

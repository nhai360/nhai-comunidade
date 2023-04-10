import { authenticatedAPI, decodeResponse } from "@/client";
import { Post, PostDecoder } from "../types";
import { useQuery } from "react-query";

async function getTrendPosts() {
  const response = await authenticatedAPI.get("/posts/trendPosts");

  return decodeResponse<Post[]>(response, PostDecoder.array());
}

export function useTrendPosts() {
  const { data: trendPosts = [], ...rest } = useQuery({
    queryKey: ["trendPosts"],
    queryFn: getTrendPosts,
  });

  return {
    trendPosts,
    ...rest,
  };
}

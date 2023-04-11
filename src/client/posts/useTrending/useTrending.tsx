import { useQuery } from "react-query";

import { authenticatedAPI, decodeResponse } from "@/client";
import { TrendPost, TrendPostDecoder } from "../types";

async function getTrending() {
  const response = await authenticatedAPI.get("/posts/trending");

  return decodeResponse<TrendPost[]>(response, TrendPostDecoder.array());
}

export function useTrending() {
  const { data: posts = [], ...rest } = useQuery({
    queryKey: ["trending"],
    queryFn: getTrending,
  });

  return {
    posts,
    ...rest,
  };
}

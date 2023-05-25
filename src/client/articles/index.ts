import { QueryClient } from "react-query";

export function invalidateVideosQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries("article");
  queryClient.invalidateQueries("articles");
}

export * from "./types";
export * from "./useArticles";

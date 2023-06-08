import { QueryClient } from "react-query";

export function invalidateArticlesQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries("article");
  queryClient.invalidateQueries("articles");
}

export * from "./types";
export * from "./useArticles";

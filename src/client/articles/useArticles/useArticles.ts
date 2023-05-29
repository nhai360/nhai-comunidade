import { useQuery } from "react-query";

import { authenticatedAPI, decodeResponse } from "@/client";
import { Article, ArticleDecoder } from "@/client/articles/types";

async function getArticles() {
  const response = await authenticatedAPI.get(`/articles`);

  // return decodeResponse<Article[]>(response, ArticleDecoder.array());
  return response.data;
}

export function useArticles() {
  const { data: articles = [], ...rest } = useQuery({
    queryKey: ["articles"],
    queryFn: getArticles,
  });

  return {
    articles,
    ...rest,
  };
}

import { useQuery } from "react-query";

import { authenticatedAPI, decodeResponse } from "@/client";
import {
  Article,
  ArticleDecoder,
  GetArticlesParams,
} from "@/client/articles/types";

export async function getArticles({
  orderBy = "createdAt",
  orderDirection = "desc",
  search,
}: GetArticlesParams) {
  const response = await authenticatedAPI.get("/articles", {
    params: {
      // orderBy: `${orderBy}:${orderDirection}`,
      search,
    },
  });

  return decodeResponse<Article[]>(response, ArticleDecoder.array());
}

export function useArticles(params: GetArticlesParams = {}) {
  const { data: articles, ...rest } = useQuery<Article[]>({
    queryKey: "articles",
    queryFn: () => getArticles(params),
  });

  return {
    articles,
    ...rest,
  };
}

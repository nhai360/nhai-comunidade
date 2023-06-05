import { useQuery } from "react-query";

import { authenticatedAPI, decodeResponse } from "@/client";
import { Article, ArticleDecoder, GetParams } from "@/client/articles/types";

async function getArticlesFromUser({ userId }: GetParams) {
  const response = await authenticatedAPI.get(`/users/${userId}/articles`);

  return decodeResponse<Article[]>(response, ArticleDecoder.array());
}

export function useArticlesFromUser({ userId }: GetParams) {
  const { data: articles = [], ...rest } = useQuery({
    enabled: !!userId,
    queryKey: ["articles", { userId }],
    queryFn: () => getArticlesFromUser({ userId }),
  });

  return {
    articles,
    ...rest,
  };
}

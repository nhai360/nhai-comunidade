import { useQuery } from "react-query";

import { authenticatedAPI, decodeResponse } from "@/client";
import {
  Article,
  ArticleDecoder,
  GetArticleParams,
} from "@/client/articles/types";

async function getArticle({ articleId }: GetArticleParams) {
  const response = await authenticatedAPI.get(`/articles/${articleId}`);

  //   return decodeResponse<Article>(response, ArticleDecoder);
  return response.data;
}

export function useArticle({ articleId }: GetArticleParams) {
  const { data: article, ...rest } = useQuery({
    enabled: !!articleId,
    queryKey: ["article", { articleId }],
    queryFn: () => getArticle({ articleId }),
  });

  return {
    article,
    ...rest,
  };
}

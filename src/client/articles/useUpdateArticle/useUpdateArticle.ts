import { useMutation, useQueryClient } from "react-query";

import { authenticatedAPI } from "@/client";
import { PatchParams, invalidateArticlesQueries } from "@/client/articles";

async function updateArticleRequest({ body, articleId }: PatchParams) {
  const response = await authenticatedAPI.patch(`/articles/${articleId}`, body);

  return response.data;
}

export function useUpdateArticle() {
  const queryClient = useQueryClient();

  const { mutate: updateArticle, ...rest } = useMutation({
    mutationFn: updateArticleRequest,
    onSuccess: () => {
      invalidateArticlesQueries(queryClient);
    },
  });

  return {
    updateArticle,
    ...rest,
  };
}

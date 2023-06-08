import { useMutation, useQueryClient } from "react-query";

import { authenticatedAPI } from "@/client";
import { invalidateArticlesQueries } from "@/client/articles";

async function createArticleRequest(params: any) {
  const response = await authenticatedAPI.post("/articles", {
    ...params,
  });

  return response.data;
}

export function useCreateArticle() {
  const queryClient = useQueryClient();

  const { mutate: createArticle, ...rest } = useMutation({
    mutationFn: createArticleRequest,
    onSuccess: () => {
      invalidateArticlesQueries(queryClient);
    },
  });

  return {
    createArticle,
    ...rest,
  };
}

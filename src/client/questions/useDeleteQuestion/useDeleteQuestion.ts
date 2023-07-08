import { useMutation, useQueryClient } from "react-query";

import { authenticatedAPI } from "@/client";
import { invalidateQuestionQueries } from "..";

async function deleteQuestionRequest({ videoId }: any) {
  const response = await authenticatedAPI.delete(
    `/videos/${videoId}/questions`
  );

  return response?.data;
}

export function useDeleteQuestion() {
  const queryClient = useQueryClient();

  const { mutate: deleteQuestion, ...rest } = useMutation({
    mutationFn: deleteQuestionRequest,
    onSuccess: () => {
      invalidateQuestionQueries(queryClient);
    },
  });

  return {
    deleteQuestion,
    ...rest,
  };
}
